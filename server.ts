import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

dotenv.config();

const firebaseConfig = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));

// Initialize Firebase Admin
const adminApp = !admin.apps.length 
  ? admin.initializeApp({ projectId: firebaseConfig.projectId })
  : admin.app();

const db = getFirestore(adminApp, firebaseConfig.firestoreDatabaseId);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Pterodactyl API Proxy (to keep keys secret)
  app.post("/api/pterodactyl/create-user", async (req, res) => {
    try {
      const { email, username, first_name, last_name, uid } = req.body;
      
      // Check if user already has a Pterodactyl ID in Firestore
      const userDoc = await db.collection("users").doc(uid).get();
      if (userDoc.exists && userDoc.data()?.pterodactylId) {
        return res.json({ id: userDoc.data()?.pterodactylId });
      }

      const response = await axios.post(
        `${process.env.PTERODACTYL_URL}/api/application/users`,
        {
          email,
          username,
          first_name,
          last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PTERODACTYL_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const pterodactylId = response.data.attributes.id;
      
      // Save Pterodactyl ID to Firestore
      await db.collection("users").doc(uid).set({
        pterodactylId,
      }, { merge: true });

      res.json(response.data.attributes);
    } catch (error: any) {
      console.error("Pterodactyl User Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to create user on panel" });
    }
  });

  app.post("/api/pterodactyl/create-server", async (req, res) => {
    try {
      const { user_id, name, egg_id, nest_id, memory, disk, cpu, order_id } = req.body;
      
      const response = await axios.post(
        `${process.env.PTERODACTYL_URL}/api/application/servers`,
        {
          name,
          user: user_id,
          egg: egg_id,
          nest: nest_id,
          docker_image: "ghcr.io/pterodactyl/yolks:java_17",
          startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
          limits: { memory, swap: 0, disk, io: 500, cpu },
          feature_limits: { databases: 1, allocations: 1, backups: 1 },
          environment: { SERVER_JARFILE: "server.jar" },
          allocation: { default: 1 },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PTERODACTYL_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const pterodactylServerId = response.data.attributes.id;
      
      // Update order status in Firestore
      if (order_id) {
        await db.collection("orders").doc(order_id).set({
          status: "provisioned",
          pterodactylServerId,
        }, { merge: true });
      }

      res.json(response.data.attributes);
    } catch (error: any) {
      console.error("Pterodactyl Server Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to create server on panel" });
    }
  });

  // Crypto Payment Gateway (Example with NowPayments)
  app.post("/api/payments/create-invoice", async (req, res) => {
    try {
      const { amount, currency, order_id, order_description, userId, planId } = req.body;
      
      // Create order in Firestore first
      await db.collection("orders").doc(order_id).set({
        userId,
        planId,
        status: "pending",
        amount,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      const response = await axios.post(
        "https://api.nowpayments.io/v1/invoice",
        {
          price_amount: amount,
          price_currency: "usd",
          pay_currency: currency,
          order_id,
          order_description,
          ipn_callback_url: `${process.env.APP_URL}/api/payments/webhook`,
          success_url: `${process.env.APP_URL}/dashboard`,
          cancel_url: `${process.env.APP_URL}/checkout`,
        },
        {
          headers: {
            "x-api-key": process.env.CRYPTO_GATEWAY_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      
      // Update order with payment ID
      await db.collection("orders").doc(order_id).set({
        paymentId: response.data.id,
      }, { merge: true });

      res.json(response.data);
    } catch (error: any) {
      console.error("Payment Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to create payment invoice" });
    }
  });

  // Webhook for payment confirmation
  app.post("/api/payments/webhook", async (req, res) => {
    const { payment_status, order_id } = req.body;
    
    if (payment_status === "finished") {
      console.log(`Payment confirmed for order: ${order_id}`);
      
      // Update order status
      await db.collection("orders").doc(order_id).set({
        status: "paid",
      }, { merge: true });

      // Trigger Pterodactyl server creation logic
      // In a real app, you'd fetch order details and plan details from Firestore
      // then call the Pterodactyl API
    }
    
    res.sendStatus(200);
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
