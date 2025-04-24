// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [userInput, setUserInput] = useState("");
//   const [responseType, setResponseType] = useState("");
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [showAIOption, setShowAIOption] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const getResponseType = async () => {
//     setLoading(true);
//     setAiAdvice("");
//     setResponseType("");
//     setShowAIOption(false);

//     try {
//       const res = await axios.post("http://127.0.0.1:5000/get_response_type", {
//         text: userInput,
//       });

//       const adviceType = res.data.response_type === 1 ? "Direct Advice" : "Supportive Response";
//       setResponseType(adviceType);
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
//       setAiAdvice(res.data.advice);
//     } catch (err) {
//       setAiAdvice("Error getting AI feedback.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="App" style={{ padding: "40px", textAlign: "center" }}>
//       <h1>Mental Health Counselor Assistant</h1>
//       <textarea
//         rows="6"
//         cols="60"
//         placeholder="Describe the patient’s issue here..."
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         style={{ padding: "10px", fontSize: "16px", borderRadius: "8px" }}
//       />
//       <br />
//       <button
//         onClick={getResponseType}
//         disabled={loading}
//         style={{ marginTop: "15px", padding: "10px 20px", fontSize: "16px" }}
//       >
//         {loading ? "Analyzing..." : "Check Response Type"}
//       </button>

//       {responseType && (
//         <div
//           style={{
//             border: "1px solid #ccc",
//             padding: "15px",
//             marginTop: "20px",
//             width: "80%",
//             backgroundColor: "#f9f9f9",
//             borderRadius: "8px",
//             textAlign: "left",
//             marginLeft: "auto",
//             marginRight: "auto",
//           }}
//         >
//           <p><strong>Advice Type:</strong> {responseType}</p>

//           {showAIOption && (
//             <>
//               <button
//                 onClick={getAIAdvice}
//                 style={{ marginTop: "10px", padding: "8px 16px", fontSize: "14px" }}
//               >
//                 Get In-Depth Feedback
//               </button>

//               {aiAdvice && (
//                 <>
//                   <h3 style={{ marginTop: "15px" }}>In-Depth Suggestion:</h3>
//                   <p>{aiAdvice}</p>
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [responseType, setResponseType] = useState("");
  const [matchedResponse, setMatchedResponse] = useState("");
  const [aiAdvice, setAiAdvice] = useState("");
  const [showAIOption, setShowAIOption] = useState(false);
  const [loading, setLoading] = useState(false);

  const getResponseType = async () => {
    setLoading(true);
    setAiAdvice("");
    setResponseType("");
    setMatchedResponse("");
    setShowAIOption(false);

    try {
      const res = await axios.post("http://127.0.0.1:5000/get_response_type", {
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
      const res = await axios.post("http://127.0.0.1:5000/get_openai_advice", {
        text: userInput,
      });
      setAiAdvice(res.data.advice);
    } catch (err) {
      setAiAdvice("Error getting AI feedback.");
      console.error(err);
    }
  };

  return (
    <div className="App" style={{ padding: "40px", textAlign: "center" }}>
      <h1>Mental Health Counselor Assistant</h1>
      <textarea
        rows="6"
        cols="60"
        placeholder="Describe the patient’s issue here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", borderRadius: "8px" }}
      />
      <br />
      <button
        onClick={getResponseType}
        disabled={loading}
        style={{ marginTop: "15px", padding: "10px 20px", fontSize: "16px" }}
      >
        {loading ? "Analyzing..." : "Check Response Type"}
      </button>

      {responseType && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginTop: "20px",
            width: "80%",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            textAlign: "left",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p><strong>Advice Type:</strong> {responseType}</p>

          {matchedResponse && (
            <>
              <p><strong>Closest Response in Dataset:</strong></p>
              <div
                style={{
                  backgroundColor: "#e8f0fe",
                  padding: "10px",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              >
                <em>{matchedResponse}</em>
              </div>
            </>
          )}

          {showAIOption && (
            <>
              <button
                onClick={getAIAdvice}
                style={{ marginTop: "10px", padding: "8px 16px", fontSize: "14px" }}
              >
                Get In-Depth AI Feedback
              </button>

              {aiAdvice && (
                <>
                  <h3 style={{ marginTop: "15px" }}>AI Suggestion:</h3>
                  <p>{aiAdvice}</p>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
