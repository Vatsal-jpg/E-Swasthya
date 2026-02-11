import express from "express";
import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// ✅ Resolve absolute project root safely
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// __dirname = backend/routes
// ../../ = project root (thakur-hack)
const PYTHON_FILE = path.resolve(
  __dirname,
  "../../model/ai.py"
);

router.post("/predict", (req, res) => {
  const { sentence } = req.body;

  console.log("🟢 Received sentence from frontend:", sentence); // ✅ LOG


  if (!sentence) {
    return res.status(400).json({ error: "sentence is required" });
  }

  execFile(
    "python3", // Changed from "python" to "python3" for Mac/Linux
    [PYTHON_FILE, sentence],
    { timeout: 120000 },
    (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Python error:", stderr || error.message);
        return res.status(500).json({ error: "AI processing failed", details: stderr || error.message });
      }

      try {
        const result = JSON.parse(stdout);

        // Check if the Python script returned an error object
        if (result.error) {
          console.error("❌ Model returned error:", result.error);
          return res.status(500).json({ error: result.error });
        }

        return res.json(result);
      } catch (err) {
        console.error("❌ JSON parse error:", stdout);
        return res.status(500).json({ error: "Invalid AI response", details: stdout });
      }
    }
  );
});

export default router;
