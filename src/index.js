import express from "express";
import adminRoutes from './routes/adminRoutes.js'

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/admin", adminRoutes); // prefijo /admin para todo lo del admin

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
