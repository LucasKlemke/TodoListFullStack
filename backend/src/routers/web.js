const express = require("express");

const { Router } = express;

const router = Router();

router.get("/ping", (req, res) => res.json({ pong: true }));

module.exports = router;
