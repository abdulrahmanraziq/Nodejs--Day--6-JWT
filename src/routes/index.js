import express from "express";
import userRouter from "./user.js";
import urlRouter from "./url.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<h1>Welcome to URL Shortner</h1>`);
});

router.use('/user', userRouter);
router.use('/url', urlRouter);

export default router;
