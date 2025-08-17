import React, { useState } from "react";
import "../css/Submit.css";
import "../css/Styles.css";

function Batches({ generalInfo, onSubmit }) {
  const { totalBatches, totalCourses } = generalInfo;
  const [batchNames, setBatchNames] = useState(Array(totalBatches).fill(""));
  const [batchSizes, setBatchSizes] = useState(Array(totalBatches).fill(""));
  const [batchCourses, setBatchCourses] = useState(Array(totalBatches).fill(""));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (batchSizes.some(size => Number(size) <= 0)) {
      alert("Batch sizes must be positive integers!");
      return;
    }


    // validate: courses <= totalCourses
    const invalid = batchCourses.some(
      (c) => c.split(",").filter(Boolean).length > totalCourses
    );
    if (invalid) {
      alert("Too many courses assigned to a batch!");
      return;
    }

    const payload = batchNames.map((name, idx) => ({
      batchName: name,
      batchSize: batchSizes[idx],
      courses: batchCourses[idx].split(",").map((c) => c.trim()), //filter(Boolean) is added in case some issue in table creation 
    }));

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter Batch Details</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            {batchNames.map((_, idx) => (
              <th key={idx}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Batch ${idx + 1}`}
                  value={batchNames[idx]}
                  onChange={(e) => {
                    const copy = [...batchNames];
                    copy[idx] = e.target.value;
                    setBatchNames(copy);
                  }}
                  required
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {batchSizes.map((_, idx) => (
              <td key={idx}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Batch size"
                  min = {1}
                  value={batchSizes[idx]}
                  onChange={(e) => {
                    const copy = [...batchSizes];
                    copy[idx] = e.target.value;
                    setBatchSizes(copy);
                  }}
                  required
                />
              </td>
            ))}
          </tr>
          <tr>
            {batchCourses.map((_, idx) => (
              <td key={idx}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Courses (comma separated)"
                  min = {1}
                  value={batchCourses[idx]}
                  onChange={(e) => {
                    const copy = [...batchCourses];
                    copy[idx] = e.target.value;
                    setBatchCourses(copy);
                  }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <button type="submit" className="btn-submit">
        Next
      </button>
    </form>
  );
}

export default Batches;
