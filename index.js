const express = require("express");
const axios = require("axios");
const qs = require("querystring");
const cors = require("cors"); // ✅ import cors

const app = express();
const PORT = 3000;

app.use(cors()); // ✅ allow all origins
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { userId, password } = req.body;

    const data = qs.stringify({
      signup_userId: userId,
      signup_confPwd: password,
    });

    const response = await axios.post(
      "https://ceg.annauniv.edu/ech/HostelConnect/Home/Login/setUserIdAndPasswordForLogin",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        httpsAgent: new (require("https").Agent)({
          rejectUnauthorized: false, // skip SSL check like -k
        }),
      }
    );

    res.status(200).json({
      message: "Request sent successfully",
      data: response.data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

