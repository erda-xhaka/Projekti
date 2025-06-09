const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/contacts",
      {
        email,
        listIds: [6], // Zëvendëso me ID-n e listës që ke në Brevo
        updateEnabled: true,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json({ success: true, message: "Subscribed" });
  } catch (error) {
    console.error("Brevo error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || "Failed to subscribe",
    });
  }
});

module.exports = router;
 