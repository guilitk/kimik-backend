import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { calculationRouter } from "./routes/calculation.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/calculation", calculationRouter);

app.get("/", (req, res, next) => {
  res.send("API funcional!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor rodando");
});
