// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";
// import "./index.css";

// function App() {
//   const [userInput, setUserInput] = useState("");
//   const [responseType, setResponseType] = useState("");
//   const [matchedResponse, setMatchedResponse] = useState("");
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [showAIOption, setShowAIOption] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const API_BASE = "https://flask-backend-53du.onrender.com";

//   const getResponseType = async () => {
//     setLoading(true);
//     setAiAdvice("");
//     setResponseType("");
//     setMatchedResponse("");
//     setShowAIOption(false);

//     try {
//       const res = await axios.post("http://127.0.0.1:5000/get_response_type", {
//         text: userInput,
//       });
//       // const res = await axios.post(`${API_BASE}/get_response_type`, {
//       //   text: userInput,
//       // });

//       const adviceType = res.data.response_type === 1 ? "Direct Advice" : "Supportive Response";
//       setResponseType(adviceType);
//       setMatchedResponse(res.data.matched_response);
//       setShowAIOption(true);
//     } catch (err) {
//       setResponseType("Error finding match.");
//       setShowAIOption(false);
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   const getAIAdvice = async () => {
//     try {
//       const res = await axios.post("http://127.0.0.1:5000/get_openai_advice", {
//         text: userInput,
//       });
//       // const res = await axios.post(`${API_BASE}/get_openai_advice`, {
//       //   text: userInput,
//       // });
//       setAiAdvice(res.data.advice);
//     } catch (err) {
//       setAiAdvice("Error getting AI feedback.");
//       console.error(err);
//     }
//   };

//   return (
//     // <div className="App" style={{ padding: "40px", textAlign: "center" }}>
//     //   <h1>Mental Health Counselor Assistant</h1>
//     //   <textarea
//     //     rows="6"
//     //     cols="60"
//     //     placeholder="Describe the patient’s issue here..."
//     //     value={userInput}
//     //     onChange={(e) => setUserInput(e.target.value)}
//     //     style={{ padding: "10px", fontSize: "16px", borderRadius: "8px" }}
//     //   />
//     //   <br />
//     //   <button
//     //     onClick={getResponseType}
//     //     disabled={loading}
//     //     style={{ marginTop: "15px", padding: "10px 20px", fontSize: "16px" }}
//     //   >
//     //     {loading ? "Analyzing..." : "Check Response Type"}
//     //   </button>

//     //   {responseType && (
//     //     <div
//     //       style={{
//     //         border: "1px solid #ccc",
//     //         padding: "15px",
//     //         marginTop: "20px",
//     //         width: "80%",
//     //         backgroundColor: "#f9f9f9",
//     //         borderRadius: "8px",
//     //         textAlign: "left",
//     //         marginLeft: "auto",
//     //         marginRight: "auto",
//     //       }}
//     //     >
//     //       <p><strong>Advice Type:</strong> {responseType}</p>

//     //       {matchedResponse && (
//     //         <>
//     //           <p><strong>Closest Response in Dataset:</strong></p>
//     //           <div
//     //             style={{
//     //               backgroundColor: "#e8f0fe",
//     //               padding: "10px",
//     //               borderRadius: "6px",
//     //               marginBottom: "10px",
//     //             }}
//     //           >
//     //             <em>{matchedResponse}</em>
//     //           </div>
//     //         </>
//     //       )}

//     //       {showAIOption && (
//     //         <>
//     //           <button
//     //             onClick={getAIAdvice}
//     //             style={{ marginTop: "10px", padding: "8px 16px", fontSize: "14px" }}
//     //           >
//     //             Get In-Depth AI Feedback
//     //           </button>

//     //           {aiAdvice && (
//     //             <>
//     //               <h3 style={{ marginTop: "15px" }}>AI Suggestion:</h3>
//     //               <p>{aiAdvice}</p>
//     //             </>
//     //           )}
//     //         </>
//     //       )}
//     //     </div>
//     //   )}
//     // </div>
//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-8">
//     <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
//     <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">Mental Health Counselor Assistant</h1>

//     <textarea
//       rows="6"
//       className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
//       placeholder="Describe the patient’s issue here..."
//       value={userInput}
//       onChange={(e) => setUserInput(e.target.value)}
//     />

//     <div className="flex justify-center mt-4 gap-3">
//       <button
//         onClick={handleGetAdvice}
//         className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
//         disabled={loading}
//       >
//         {loading ? "Thinking..." : "Get Advice"}
//       </button>
//     </div>

//     {advice && (
//       <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-sm">
//         <h3 className="font-semibold text-gray-700">Suggested Advice:</h3>
//         <p className="mt-2 text-gray-800 whitespace-pre-line">{advice}</p>
//       </div>
//     )}

//     {responseType && (
//       <p className="mt-4 text-sm text-gray-500">
//         <strong>Advice Type:</strong> {responseType}
//       </p>
//     )}
//   </div>
// </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [responseType, setResponseType] = useState("");
  const [matchedResponse, setMatchedResponse] = useState("");
  const [aiAdvice, setAiAdvice] = useState("");
  const [showAIOption, setShowAIOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_BASE = "https://flask-backend-53du.onrender.com"; // ✅ change to your deployed backend

  const handleGetAdvice = async () => {
    setLoading(true);
    setAiAdvice("");
    setResponseType("");
    setMatchedResponse("");
    setShowAIOption(false);

    try {
      const res = await axios.post(`${API_BASE}/get_response_type`, {
        text: userInput,
      });

      const adviceType = res.data.response_type === 1 ? "Direct Advice" : "Supportive Response";
      setResponseType(adviceType);
      setMatchedResponse(res.data.matched_response);
      setShowAIOption(true);
    } catch (err) {
      setResponseType("Error finding match.");
      setShowAIOption(false);
      console.error(err);
    }

    setLoading(false);
  };

  const getAIAdvice = async () => {
    try {
      const res = await axios.post(`${API_BASE}/get_openai_advice`, {
        text: userInput,
      });
      setAiAdvice(res.data.advice);
    } catch (err) {
      setAiAdvice("Error getting AI feedback.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 flex justify-center">
      <div className="bg-white max-w-2xl w-full p-6 rounded-2xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-indigo-600 text-center">
          Mental Health Counselor Assistant
        </h1>

        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          placeholder="Describe the patient’s issue here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <div className="text-center">
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            {loading ? "Analyzing..." : "Check Response Type"}
          </button>
        </div>

        {responseType && (
          <div className="bg-indigo-50 p-4 rounded-xl">
            <p><strong>Advice Type:</strong> {responseType}</p>
          </div>
        )}

        {matchedResponse && (
          <div className="bg-gray-100 p-5 rounded-xl shadow-inner">
            <h2 className="font-semibold text-gray-800 mb-2">Closest Response in Dataset:</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{matchedResponse}</p>
          </div>
        )}

        {showAIOption && (
          <div className="text-center">
            <button
              onClick={getAIAdvice}
              className="bg-purple-600 text-white mt-4 px-4 py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Get In-Depth AI Feedback
            </button>
          </div>
        )}

        {aiAdvice && (
          <div className="bg-green-50 p-5 rounded-xl shadow-inner mt-4">
            <h2 className="font-semibold text-green-700 mb-2">AI Suggestion:</h2>
            <p className="text-gray-800 whitespace-pre-wrap">{aiAdvice}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

