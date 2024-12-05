// Importar módulos necesarios
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import ejs from "ejs";
import { config as dotenv } from "dotenv";
import recetasRouter from "./routes/recetas.js";

dotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar la app de Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de vistas: lee los archivos .ejs de la carpeta views
app.set("views", path.join(__dirname, "..", "views"));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

// Conectar a la base de datos
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    // Crear un cliente de Mongoose
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err);
  }
}
run();

// Configuración de rutas
app.use("/recetas", recetasRouter);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
