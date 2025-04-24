# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from llm_utils import get_llm_advice
# from llm_utils import predict_response_type
# from dotenv import load_dotenv
# import os
# import openai

# load_dotenv()

# api_key = os.getenv("OPENAI_API_KEY")
# client = openai.OpenAI(api_key=api_key)

# app = Flask(__name__)
# CORS(app)  

# @app.route("/")
# def home():
#     return "Mental Health Assistant Backend is running."

# @app.route("/get_advice", methods=["POST"])
# def get_advice():
#     data = request.get_json()
#     user_input = data.get("text", "")
#     if not user_input:
#         return jsonify({"error": "Input text is required"}), 400
    
#     advice = get_llm_advice(user_input)
#     response_type = predict_response_type(advice)
#     return jsonify({
#         "advice": advice,
#         "response_type": response_type
#         })

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from llm_utils import get_llm_advice, find_best_match
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Mental Health Assistant Backend is running."

@app.route("/get_response_type", methods=["POST"])
def get_response_type():
    data = request.get_json()
    user_input = data.get("text", "")

    match_result = find_best_match(user_input)
    return jsonify(match_result)

@app.route("/get_openai_advice", methods=["POST"])
def get_openai_advice():
    data = request.get_json()
    user_input = data.get("text", "")
    advice = get_llm_advice(user_input)
    return jsonify({"advice": advice})

if __name__ == "__main__":
    app.run(debug=True)
