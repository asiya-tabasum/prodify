const express = require("express");
const router = express.Router();


router.post("/verify-admin", (req, res) => {
  const { password } = req.body;

  if (password === "admin") {
    return res.status(200).json({ valid: true });
  } else {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
