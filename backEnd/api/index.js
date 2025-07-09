const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://tisoraa.com'],
  credentials: true
}));

app.post('/api/payments/initialize', (req, res) => {
  // Example test response (replace with Paystack logic)
  res.json({
    success: true,
    message: "Payment initialized",
    data: { reference: "test_ref_12345" }
  });
});

// 👇 export the app wrapped for serverless
module.exports.handler = serverless(app);
