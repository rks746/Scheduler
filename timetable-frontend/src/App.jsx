import React, { useState } from "react";
import Home from "./pages/Home";
import Batches from "./pages/Batches";
import Courses from "./pages/Courses";
import Result from "./pages/Result";

function App() {
  const [step, setStep] = useState(1);
  const [generalInfo, setGeneralInfo] = useState({});
  const [batchesInfo, setBatchesInfo] = useState({});
  const [coursesInfo, setCoursesInfo] = useState({});

  const handleGeneralSubmit = (data) => {
    setGeneralInfo(data);
    setStep(2);
  };

  const handleBatchesSubmit = (data) => {
    setBatchesInfo(data);
    setStep(3);
  };

  const handleCoursesSubmit = (data) => {
    setCoursesInfo(data);
    setStep(4); 
  };

  return (
    <div className="container mt-4">
      {step === 1 && <Home onSubmit={handleGeneralSubmit} />}
      {step === 2 && <Batches generalInfo={generalInfo} onSubmit={handleBatchesSubmit} />}
      {step === 3 && <Courses generalInfo={generalInfo} onSubmit={handleCoursesSubmit} courseNames={[...new Set(batchesInfo.flatMap(b => b.courses))]}/>}
      {step === 4 && (
        <Result payload={{ generalInfo, batchesInfo, coursesInfo }} />
      )}
    </div>
  );
}

export default App;
