import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export const generatePrescriptionPDF = async (data) => {
    const {
        doctorName,
        patientName,
        diagnosis,
        medicines,
        advice,
        prescriptionId
    } = data;

    const fileName = `prescription_${prescriptionId}.pdf`;
    const filePath = path.join("uploads/prescriptions", fileName);

    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Title
    doc.fontSize(18).text("Medical Prescription", { align: "center" });
    doc.moveDown(2);

    // Doctor & Patient
    doc.fontSize(12).text(`Doctor: ${doctorName}`);
    doc.text(`Patient: ${patientName}`);
    doc.moveDown();

    // Diagnosis
    doc.fontSize(14).text("Diagnosis");
    doc.fontSize(12).text(diagnosis);
    doc.moveDown();

    // Medicines
    doc.fontSize(14).text("Medicines");
    doc.moveDown(0.5);

    medicines.forEach((med, index) => {
        doc.text(
            `${index + 1}. ${med.name} | ${med.dosage} | ${med.duration}`
        );
    });

    doc.moveDown();

    // Advice
    doc.fontSize(14).text("Advice");
    doc.fontSize(12).text(advice || "—");

    doc.moveDown(2);
    doc.text("Doctor Signature", { align: "right" });

    doc.end();

    return filePath;
};
