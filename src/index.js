import express from "express";
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js'; // puedes renombrarlo si maneja todos los roles

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

// Rutas sin prefijo
app.use(authRoutes); // <-- sin prefijo para login

// Rutas con prefijo /admin
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
