import express from "express";
import PatientController from "../controllers/PatientController.js"


// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

router.get("/patients",  PatientController.index);
router.get("/patients/:id",  PatientController.show);
router.post("/patients", PatientController.store);
router.put("/patients/:id", PatientController.update);
router.delete("/patients/:id", PatientController.destroy);
router.get('/search/:name', PatientController.search);
router.get('/status/positive', PatientController.statusPositive);

// Membuat routing patient

// export router
export default router;
