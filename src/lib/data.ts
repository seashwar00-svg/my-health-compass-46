import doc1 from "@/assets/doc1.jpg";
import doc2 from "@/assets/doc2.jpg";
import doc3 from "@/assets/doc3.jpg";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  category: string;
  rating: number;
  hours: string;
  clinic: string;
  distance: string;
  phone: string;
  photo: string;
};

export const doctors: Doctor[] = [
  { id: "helena", name: "Helena Mcneil", specialty: "General Practitioner", category: "General Practitioners", rating: 4.9, hours: "09:00 am – 02:00 pm", clinic: "Greenview Family Clinic", distance: "0.8 km", phone: "+15550101", photo: doc1 },
  { id: "salman", name: "Salman Pacheco", specialty: "Dentist", category: "Dental", rating: 4.8, hours: "10:00 am – 04:00 pm", clinic: "BrightSmile Dental", distance: "1.4 km", phone: "+15550102", photo: doc2 },
  { id: "ananya", name: "Ananya Sharma", specialty: "Cardiologist", category: "Cardiology", rating: 4.9, hours: "11:00 am – 06:00 pm", clinic: "City Heart Institute", distance: "2.1 km", phone: "+15550103", photo: doc3 },
];

export const ambulances = [
  { id: "a1", name: "CityCare Ambulance", unit: "ALS Unit 12", location: "Main St & 5th Ave", distance: "1.2 km", eta: "4 min", phone: "+15550911", available: true },
  { id: "a2", name: "Red Cross Rapid Response", unit: "BLS Unit 3", location: "Riverside Hospital", distance: "2.6 km", eta: "8 min", phone: "+15550912", available: true },
  { id: "a3", name: "MediFleet Emergency", unit: "ICU Unit 7", location: "Oak Park Station", distance: "3.9 km", eta: "12 min", phone: "+15550913", available: false },
];
