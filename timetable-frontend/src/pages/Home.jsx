import React, { useState } from "react";
import "../css/Submit.css"; 
import "../css/Styles.css";

function Home({ onSubmit }) {
  const [batches, setBatches] = useState("");
  const [courses, setCourses] = useState("");
  const [rooms, setRooms] = useState("");
  const [maxClasses, setMaxClasses] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(batches) <= 0 || Number(courses) <= 0 || Number(rooms) <= 0 || Number(maxClasses) <= 0) {
      alert("All values must be positive integers greater than 0!");
      return;
    }

    const payload = {
      totalBatches: Number(batches),
      totalCourses: Number(courses),
      totalRooms: Number(rooms),
      maxClassesPerDay: Number(maxClasses),
    };
    onSubmit(payload);
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Side Heading */}
        <div className="col-md-4">
          <h2 className="fw-bold">Let's schedule a timetable</h2>
        </div>

        {/* Forms */}
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Total number of batches</label>
              <input
                type="number"
                className="form-control"
                min = {1}
                value={batches}
                onChange={(e) => setBatches(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Total number of courses</label>
              <input
                type="number"
                className="form-control"
                min = {1}
                value={courses}
                onChange={(e) => setCourses(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Total number of rooms</label>
              <input
                type="number"
                className="form-control"
                min = {1}
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Maximum number of classes per day (per batch)
              </label>
              <input
                type="number"
                className="form-control"
                min = {1}
                value={maxClasses}
                onChange={(e) => setMaxClasses(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
