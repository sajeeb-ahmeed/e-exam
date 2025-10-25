import React, { useState, useEffect } from "react";
import axios from "axios";
import { examData } from "../data/questions";
import CodeEditor from "../components/CodeEditor";

export default function Exam() {
  const [answers, setAnswers] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(150 * 60); // 2:30 hours in minutes → seconds
  const [currentPart, setCurrentPart] = useState(0);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (partId, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [partId]: { ...(prev[partId] || {}), [questionId]: value },
    }));
  };

  const handleSubmit = async () => {
    if (!studentName || !studentEmail) {
      alert("Please enter your name and email");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/answers/submit`, {

        studentName,
        studentEmail,
        examTitle: examData.examTitle,
        answers,
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to submit answers");
    }
  };

  const goNextPart = () => {
    if (currentPart < examData.parts.length - 1) setCurrentPart(currentPart + 1);
  };

  const goPrevPart = () => {
    if (currentPart > 0) setCurrentPart(currentPart - 1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{examData.examTitle}</h1>
        <div className="text-xl font-semibold bg-blue-100 text-blue-700 px-4 py-2 rounded">
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Student Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Your Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Progress Tracker */}
      <div className="flex items-center space-x-2 mb-4">
        {examData.parts.map((part, idx) => (
          <div
            key={part.part}
            className={`flex-1 h-2 rounded ${idx === currentPart ? "bg-blue-600" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {examData.parts[currentPart].questions.map((q) => (
          <div
            key={q.id}
            className="p-4 border rounded-lg bg-white shadow hover:shadow-lg transition"
          >
            <p className="font-medium mb-2">{q.question}</p>
            {q.options ? (
              <div className="space-y-1">
                {q.options.map((opt) => (
                  <label key={opt} className="block cursor-pointer hover:bg-gray-50 rounded p-1">
                    <input
                      type="radio"
                      name={`part${examData.parts[currentPart].part}-q${q.id}`}
                      value={opt}
                      checked={answers[currentPart]?.[q.id] === opt}
                      onChange={(e) => handleAnswer(currentPart, q.id, e.target.value)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : (
              // Use CodeEditor for coding/mini-project
              <CodeEditor
                value={answers[currentPart]?.[q.id] || ""}
                onChange={(val) => handleAnswer(currentPart, q.id, val)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 sticky bottom-0 bg-white p-4 shadow-inner rounded">
        <button
          onClick={goPrevPart}
          disabled={currentPart === 0}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {currentPart < examData.parts.length - 1 ? (
          <button
            onClick={goNextPart}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
}
