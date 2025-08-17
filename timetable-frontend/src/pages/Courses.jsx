import React, { useState } from "react";
import "../css/Submit.css";
import "../css/Styles.css";

function Courses({ generalInfo, onSubmit, courseNames }) {
  const totalCourses = courseNames.length;

  const [teacherNames, setTeacherNames] = useState(Array(totalCourses).fill(""));
  const [hoursPerSession, setHoursPerSession] = useState(Array(totalCourses).fill(""));
  const [sessionsPerWeek, setSessionsPerWeek] = useState(Array(totalCourses).fill(""));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hoursPerSession.some(h => Number(h) <= 0) || sessionsPerWeek.some(s => Number(s) <= 0)) {
      alert("Hours/session and sessions/week must be positive integers!");
      return;
    }


    const payload = courseNames.map((name, idx) => ({
      courseName: name, // comes from props, not input
      teacher: teacherNames[idx],
      hours: hoursPerSession[idx],
      sessions: sessionsPerWeek[idx],
    }));
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter Course Details</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            {courseNames.map((name, idx) => (
              <th key={idx}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {teacherNames.map((_, idx) => (
              <td key={idx}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Teacher"
                  value={teacherNames[idx]}
                  onChange={(e) => {
                    const copy = [...teacherNames];
                    copy[idx] = e.target.value;
                    setTeacherNames(copy);
                  }}
                />
              </td>
            ))}
          </tr>
          <tr>
            {hoursPerSession.map((_, idx) => (
              <td key={idx}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Hours/session"
                  min = {1}
                  value={hoursPerSession[idx]}
                  onChange={(e) => {
                    const copy = [...hoursPerSession];
                    copy[idx] = e.target.value;
                    setHoursPerSession(copy);
                  }}
                />
              </td>
            ))}
          </tr>
          <tr>
            {sessionsPerWeek.map((_, idx) => (
              <td key={idx}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Sessions/week"
                  min = {1}
                  value={sessionsPerWeek[idx]}
                  onChange={(e) => {
                    const copy = [...sessionsPerWeek];
                    copy[idx] = e.target.value;
                    setSessionsPerWeek(copy);
                  }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <button type="submit" className="btn-success">
        Finish
      </button>
    </form>
  );
}

export default Courses;
