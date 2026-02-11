import Prescription from "../models/prescription.model.js";

export const updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) return res.status(404).json({ message: "Prescription not found" });
    if (prescription.doctor.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(prescription, req.body);
    await prescription.save();

    const populated = await Prescription.findById(prescription._id)
      .populate("patient", "name age gender phone");

    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

