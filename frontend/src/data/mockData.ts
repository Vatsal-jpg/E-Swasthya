import {
  Appointment,
  Clinic,
  Doctor,
  Medicine,
  Patient,
  Report,
  Notification,
} from "@/types";

/* ===============================
   MOCK PATIENT
================================ */
export const mockPatient: Patient = {
  id: "p1",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 98765 43210",
  role: "patient",
  bloodGroup: "B+",
  allergies: ["Penicillin", "Dust"],
  chronicConditions: ["Hypertension"],
  emergencyContact: {
    name: "Priya Kumar",
    phone: "+91 98765 43211",
    relation: "Spouse",
  },
};

/* ===============================
   MOCK DOCTOR
================================ */
export const mockDoctor: Doctor = {
  id: "d1",
  name: "Dr. Anita Sharma",
  email: "dr.anita@eswasthya.com",
  phone: "+91 98765 12345",
  role: "doctor",
  specialization: "General Physician",
  qualification: "MBBS, MD",
  experience: 12,
  consultationFee: 500,
  rating: 4.8,
  availability: [
    { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Tuesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Wednesday", startTime: "09:00", endTime: "13:00", isAvailable: true },
    { day: "Thursday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Friday", startTime: "09:00", endTime: "17:00", isAvailable: true },
  ],
};

/* ===============================
   MOCK APPOINTMENTS
================================ */
export const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    patientId: "p1",
    patientName: "Rajesh Kumar",
    doctorId: "d1",
    doctorName: "Dr. Anita Sharma",
    date: "2025-01-23",
    time: "10:00 AM",
    status: "scheduled",
    type: "video",
  },
  {
    id: "apt2",
    patientId: "p1",
    patientName: "Rajesh Kumar",
    doctorId: "d1",
    doctorName: "Dr. Anita Sharma",
    date: "2025-01-20",
    time: "11:00 AM",
    status: "completed",
    type: "video",
    notes: "Follow-up for blood pressure management",
  },
];

/* ===============================
   MOCK REPORTS
================================ */
export const mockReports: Report[] = [
  {
    id: "r1",
    patientId: "p1",
    name: "Blood Test Report",
    type: "Laboratory",
    date: "2025-01-15",
    fileUrl: "/reports/blood-test.pdf",
    aiSummary:
      "All values within normal range. Slight elevation in cholesterol levels.",
  },
  {
    id: "r2",
    patientId: "p1",
    name: "Chest X-Ray",
    type: "Radiology",
    date: "2025-01-10",
    fileUrl: "/reports/xray.pdf",
    aiSummary: "No abnormalities detected. Lungs appear clear.",
  },
];

/* ===============================
   MOCK CLINICS (✅ WITH LAT/LNG)
================================ */
export const mockClinics: Clinic[] = [
  {
    id: "c1",
    name: "Rural Health Center",
    address: "Main Road, Village Panchayat",
    distance: "2.5 km",
    specialty: "General Medicine",
    phone: "+91 98765 00001",
    rating: 4.5,
    isOpen: true,

    // ✅ REQUIRED FOR MAP
    lat: 19.076,
    lng: 72.8777,
  },
  {
    id: "c2",
    name: "Community Hospital",
    address: "Block Headquarters",
    distance: "8 km",
    specialty: "Multi-specialty",
    phone: "+91 98765 00002",
    rating: 4.2,
    isOpen: true,

    // ✅ REQUIRED FOR MAP
    lat: 19.082,
    lng: 72.88,
  },
  {
    id: "c3",
    name: "PHC Wellness Clinic",
    address: "Near Bus Stand",
    distance: "5 km",
    specialty: "Primary Care",
    phone: "+91 98765 00003",
    rating: 4.0,
    isOpen: false,

    // ✅ REQUIRED FOR MAP
    lat: 19.07,
    lng: 72.87,
  },
];

/* ===============================
   MOCK MEDICINES
================================ */
export const mockMedicines: Medicine[] = [
  {
    name: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    duration: "30 days",
    timing: "before-meal",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "30 days",
    timing: "after-meal",
  },
  {
    name: "Vitamin D3",
    dosage: "60000 IU",
    frequency: "Once weekly",
    duration: "8 weeks",
    timing: "with-meal",
  },
];

/* ===============================
   MOCK NOTIFICATIONS
================================ */
export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Upcoming Appointment",
    message:
      "You have an appointment with Dr. Anita Sharma tomorrow at 10:00 AM",
    type: "appointment",
    read: false,
    createdAt: "2025-01-22T09:00:00Z",
  },
  {
    id: "n2",
    title: "Medicine Reminder",
    message: "Time to take your Amlodipine 5mg",
    type: "medicine",
    read: false,
    createdAt: "2025-01-22T08:00:00Z",
  },
  {
    id: "n3",
    title: "Report Ready",
    message: "Your blood test report is now available",
    type: "report",
    read: true,
    createdAt: "2025-01-21T14:00:00Z",
  },
];

/* ===============================
   SYMPTOMS (AI PREDICTION)
================================ */
export const symptoms = [
  { id: "s1", name: "Fever", icon: "🌡️" },
  { id: "s2", name: "Cough", icon: "😷" },
  { id: "s3", name: "Headache", icon: "🤕" },
  { id: "s4", name: "Fatigue", icon: "😴" },
  { id: "s5", name: "Body Pain", icon: "💪" },
  { id: "s6", name: "Nausea", icon: "🤢" },
  { id: "s7", name: "Diarrhea", icon: "🚽" },
  { id: "s8", name: "Sore Throat", icon: "🗣️" },
  { id: "s9", name: "Chest Pain", icon: "💔" },
  { id: "s10", name: "Shortness of Breath", icon: "😮‍💨" },
  { id: "s11", name: "Loss of Appetite", icon: "🍽️" },
  { id: "s12", name: "Skin Rash", icon: "🔴" },
];

/* ===============================
   HEALTH ARTICLES
================================ */
export const healthArticles = [
  {
    id: '1',
    title: 'Understanding Diabetes',
    category: 'Chronic Conditions',
    description: 'Learn about diabetes management and lifestyle changes.',
    detailedContent: 'Diabetes is a chronic condition that affects how your body processes blood sugar (glucose). There are two main types: Type 1 diabetes occurs when your immune system mistakenly attacks and destroys insulin-producing beta cells in the pancreas, requiring lifelong insulin therapy. Type 2 diabetes develops when your body becomes resistant to insulin or doesn\'t produce enough insulin to maintain normal glucose levels. Managing diabetes effectively involves several key components: regular blood sugar monitoring to track your glucose levels throughout the day, maintaining a balanced diet rich in whole grains, lean proteins, vegetables, and healthy fats while limiting processed foods and sugary drinks, engaging in regular physical activity for at least 150 minutes per week, taking prescribed medications or insulin as directed by your healthcare provider, and attending regular check-ups to monitor for complications. Long-term complications can include cardiovascular disease, nerve damage (neuropathy), kidney damage (nephropathy), eye damage (retinopathy), and foot problems. Prevention of these complications requires maintaining healthy blood pressure and cholesterol levels, caring for your feet daily by checking for cuts or blisters, getting regular comprehensive eye examinations, and working closely with your healthcare team to adjust your treatment plan as needed.'
  },
  {
    id: '2',
    title: 'Managing Hypertension',
    category: 'Chronic Conditions',
    description: 'Essential tips for controlling high blood pressure.',
    detailedContent: 'Hypertension, or high blood pressure, is often called the "silent killer" because it typically has no symptoms but can lead to serious health complications including heart disease, stroke, and kidney damage. Blood pressure is measured in millimeters of mercury (mmHg) with two numbers: systolic pressure (the top number, measuring pressure when your heart beats) and diastolic pressure (the bottom number, measuring pressure when your heart rests between beats). Normal blood pressure is below 120/80 mmHg, while hypertension is diagnosed at 130/80 mmHg or higher. Managing hypertension involves lifestyle modifications such as reducing sodium intake to less than 2,300 mg per day (ideally 1,500 mg), maintaining a healthy weight through balanced nutrition and regular exercise, limiting alcohol consumption, quitting smoking, managing stress through relaxation techniques like meditation or yoga, and getting adequate sleep of 7-9 hours per night. The DASH (Dietary Approaches to Stop Hypertension) diet, which emphasizes fruits, vegetables, whole grains, and low-fat dairy while limiting saturated fats and cholesterol, has been proven effective in lowering blood pressure. Regular monitoring at home with a validated blood pressure monitor, taking prescribed medications consistently even when you feel fine, and keeping regular appointments with your healthcare provider are crucial for preventing complications and maintaining optimal cardiovascular health.'
  },
  {
    id: '3',
    title: 'Heart Health Basics',
    category: 'Cardiovascular',
    description: 'Key information about maintaining a healthy heart.',
    detailedContent: 'Your heart is a powerful muscle that pumps approximately 2,000 gallons of blood through your body every day, delivering oxygen and nutrients to all your organs and tissues. Maintaining heart health is essential for longevity and quality of life. Cardiovascular disease remains the leading cause of death globally, but many risk factors are modifiable through lifestyle changes. Key strategies for heart health include eating a heart-healthy diet rich in omega-3 fatty acids (found in fish like salmon and sardines), fiber (from whole grains, fruits, and vegetables), and healthy fats (like those in nuts, avocados, and olive oil) while limiting saturated fats, trans fats, and excessive sodium. Regular aerobic exercise strengthening your heart muscle through activities like brisk walking, swimming, cycling, or dancing for at least 30 minutes most days of the week. Maintaining a healthy weight reduces strain on your heart and lowers risk of related conditions like diabetes and hypertension. Avoiding tobacco in all forms is critical, as smoking damages blood vessels and increases heart disease risk significantly. Managing stress through healthy coping mechanisms, adequate sleep, and social connections supports heart health. Know your numbers: regularly check your blood pressure, cholesterol levels (including LDL, HDL, and triglycerides), blood sugar, and body mass index. Warning signs of a heart attack include chest pain or discomfort, shortness of breath, pain in the arms, back, neck, jaw, or stomach, cold sweats, nausea, and lightheadedness. If you experience these symptoms, call emergency services immediately, as prompt treatment can save your life and minimize heart damage.'
  },
  {
    id: '4',
    title: 'Nutrition Fundamentals',
    category: 'Nutrition',
    description: 'Building a balanced and healthy diet.',
    detailedContent: 'Proper nutrition is the foundation of good health, providing your body with the essential nutrients it needs to function optimally. A balanced diet includes macronutrients (carbohydrates, proteins, and fats) and micronutrients (vitamins and minerals) in appropriate proportions. Carbohydrates should primarily come from complex sources like whole grains, legumes, fruits, and vegetables rather than refined sugars and processed foods. These provide sustained energy and important fiber for digestive health. Aim for 25-30 grams of fiber daily. Proteins are essential for building and repairing tissues, producing enzymes and hormones, and supporting immune function. Include diverse protein sources such as lean meats, poultry, fish, eggs, dairy, legumes, nuts, and seeds. Adults generally need 0.8 grams of protein per kilogram of body weight daily. Healthy fats, particularly unsaturated fats from sources like olive oil, avocados, nuts, seeds, and fatty fish, support brain function, hormone production, and nutrient absorption. Limit saturated fats and avoid trans fats. Micronutrients, though needed in smaller amounts, are crucial for various bodily functions. Eating a rainbow of colorful fruits and vegetables ensures a wide range of vitamins, minerals, and antioxidants. Stay hydrated by drinking adequate water throughout the day (generally 8-10 cups, though needs vary based on activity level and climate). Practice mindful eating by paying attention to hunger and fullness cues, eating slowly, and avoiding distractions during meals. Plan meals ahead to make healthier choices, read nutrition labels to understand what you\'re consuming, and consider working with a registered dietitian for personalized guidance, especially if you have specific health conditions or dietary needs.'
  },
  {
    id: '5',
    title: 'Mental Health Awareness',
    category: 'Mental Health',
    description: 'Understanding and supporting mental wellness.',
    detailedContent: 'Mental health is just as important as physical health and encompasses our emotional, psychological, and social well-being. It affects how we think, feel, act, handle stress, relate to others, and make choices. Mental health conditions, including depression, anxiety, bipolar disorder, and others, are common and treatable, yet stigma often prevents people from seeking help. Depression is characterized by persistent sadness, loss of interest in activities, changes in appetite or sleep, fatigue, difficulty concentrating, and sometimes thoughts of death or suicide. Anxiety disorders involve excessive worry, fear, or nervousness that interferes with daily activities. Recognizing warning signs in yourself or others is crucial: changes in eating or sleeping patterns, withdrawal from people and activities, having low or no energy, feeling numb or like nothing matters, unexplained aches and pains, feeling helpless or hopeless, smoking, drinking, or using drugs more than usual, feeling unusually confused, forgetful, angry, upset, worried, or scared, severe mood swings, or thinking of harming yourself or others. Supporting mental wellness involves maintaining social connections and nurturing relationships, engaging in regular physical activity which releases mood-boosting endorphins, practicing stress-reduction techniques such as meditation, deep breathing, or yoga, getting adequate quality sleep, eating a nutritious diet, limiting alcohol and avoiding drugs, pursuing hobbies and activities that bring joy and meaning, and seeking professional help when needed. Treatment options include psychotherapy (talk therapy), medications, or a combination of both. Cognitive-behavioral therapy (CBT), dialectical behavior therapy (DBT), and other evidence-based approaches can be highly effective. If you or someone you know is in crisis, contact the National Suicide Prevention Lifeline (988) or go to your nearest emergency room. Remember, seeking help is a sign of strength, not weakness, and recovery is possible.'
  },
  {
    id: '6',
    title: 'Exercise and Fitness',
    category: 'Fitness',
    description: 'Starting and maintaining an active lifestyle.',
    detailedContent: 'Regular physical activity is one of the most important things you can do for your health, offering benefits for nearly every system in your body. The World Health Organization recommends adults get at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week, plus muscle-strengthening activities on two or more days. Exercise improves cardiovascular health by strengthening your heart and improving circulation, helps control weight by burning calories and building metabolism-boosting muscle, strengthens bones and muscles reducing risk of osteoporosis and sarcopenia, improves mental health by releasing endorphins and reducing symptoms of depression and anxiety, enhances sleep quality, boosts energy levels, improves cognitive function and may reduce dementia risk, strengthens immune function, and helps manage or prevent chronic conditions like diabetes, hypertension, and arthritis. Types of exercise include: aerobic (cardio) activities like walking, jogging, swimming, cycling, or dancing that increase heart rate and breathing; strength training using weights, resistance bands, or bodyweight exercises to build and maintain muscle mass; flexibility exercises like stretching or yoga that improve range of motion and prevent injury; and balance exercises particularly important for older adults to prevent falls. Starting an exercise routine can feel overwhelming, so begin slowly and gradually increase intensity and duration. Choose activities you enjoy to increase adherence, set realistic and specific goals, find an exercise buddy for accountability and motivation, schedule workouts like any other important appointment, listen to your body and rest when needed to prevent injury and burnout, warm up before exercise and cool down afterward, stay hydrated, and wear appropriate footwear and clothing. Remember that any movement is better than none—even short bursts of activity throughout the day add up. If you have chronic health conditions or haven\'t been active, consult your healthcare provider before starting a new exercise program. Consider working with a certified personal trainer or physical therapist, especially when beginning, to ensure proper form and create an appropriate program for your fitness level and goals.'
  }
];
