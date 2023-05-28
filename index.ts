import express from "express";
import { tokenRouter } from "./routes/token";
import { aboutRouter } from "./routes/about";

export const app = express();

app.use(express.json());
app.use(tokenRouter);
app.use(aboutRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
