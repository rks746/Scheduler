import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend
});

export const generateTimetable = (payload) => {
  return API.post("/generate-timetable", payload);
};
