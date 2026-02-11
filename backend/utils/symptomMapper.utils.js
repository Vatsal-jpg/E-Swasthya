export const mapSymptomToSpecialization = (symptoms) => {
  const s = symptoms.toLowerCase();

  if (s.includes("chest") || s.includes("heart") || s.includes("bp"))
    return "Cardiologist";

  if (s.includes("skin") || s.includes("rash") || s.includes("acne") || s.includes("itch"))
    return "Dermatologist";

  if (s.includes("bone") || s.includes("fracture") || s.includes("joint") || s.includes("knee"))
    return "Orthopedic";

  if (s.includes("ear") || s.includes("nose") || s.includes("throat") || s.includes("sinus"))
    return "ENT Specialist";

  if (s.includes("eye") || s.includes("vision") || s.includes("blur"))
    return "Ophthalmologist";

  if (s.includes("pregnant") || s.includes("period") || s.includes("gyne"))
    return "Gynecologist";

  if (s.includes("child") || s.includes("baby") || s.includes("infant"))
    return "Pediatrician";

  if (s.includes("anxiety") || s.includes("depression") || s.includes("mental"))
    return "Psychiatrist";

  return "General Physician";
};
