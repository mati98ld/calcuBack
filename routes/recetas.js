import express from "express";
import { Receta } from "../models/Receta.js";

const router = express.Router();

router.get("/todas", async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/nombres", async (req, res) => {
  try {
    const recetas = await Receta.find();
    const nombresRecetas = [];
    recetas.forEach((receta) => {
      nombresRecetas.push(receta.nombreReceta);
    });
    res.status(200).json(nombresRecetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  console.log(req.query);
  try {
    const receta = await Receta.findOne({
      nombreReceta: req.query.nombreReceta,
    });
    if (receta) {
      res.status(200).json(receta);
    } else {
      res.status(404).json({ message: "Receta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const receta = await Receta.findOneAndDelete({
      nombreReceta: req.query.nombreReceta,
    });
    if (receta) {
      res.status(200).json(receta);
    } else {
      res.status(404).json({ message: "Receta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const receta = new Receta(req.body);
    await receta.save();
    res.status(201).json(receta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una receta

router.patch("/", async (req, res) => {
  try {
    const receta = await Receta.findOneAndUpdate(
      { nombreReceta: req.query.nombreReceta },
      req.body,
      { new: true }
    );
    if (receta) {
      res.status(200).json(receta);
    } else {
      res.status(404).json({ message: "Receta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/fav", async (req, res) => {
  try {
    const receta = await Receta.findOne({
      nombreReceta: req.query.nombreReceta,
    });
    if (receta) {
      receta.favorita = !receta.favorita;
      await receta.save();
      res.status(200).json(receta);
    } else {
      res.status(404).json({ message: "Receta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/", (req, res) => {
  res.send("Request PUT");
});

export default router;
