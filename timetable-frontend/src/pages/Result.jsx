import React, { useEffect, useState } from "react";
import axios from "axios";

function Result({ payload }) {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const periods = [1, 2, 3, 4];

  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/generate-timetable",
          payload
        );

        const flat = response.data.timetable;

        // group into: day → batch → period
        const structured = {};
        flat.forEach((entry) => {
          const { batch, day, period } = entry;
          if (!structured[day]) structured[day] = {};
          if (!structured[day][batch]) structured[day][batch] = {};
          structured[day][batch][period] = entry;
        });

        setTimetable(structured);
      } catch (err) {
        setError("Failed to fetch timetable. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    sendData();
  }, [payload]);

  if (loading) return <p>Generating timetable...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="mt-5">
      <h2 className="fw-bold">Generated Timetable</h2>

      <table className="table table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Day</th>
            <th>Batch</th>
            {periods.map((p) => (
              <th key={p}>P{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) =>
            timetable[day]
              ? Object.keys(timetable[day]).map((batch) => (
                  <tr key={`${day}-${batch}`}>
                    <td>{day}</td>
                    <td>{batch}</td>
                    {periods.map((p) => {
                      const entry = timetable[day][batch][p];
                      return (
                        <td key={p}>
                          {entry ? (
                            <div>
                              <b>{entry.course}</b>
                              <div>{entry.room}</div>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              : null
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
