import openai
import os
import joblib
import pandas as pd
from dotenv import load_dotenv
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=api_key)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# clf = joblib.load("model.joblib")
# vectorizer = joblib.load("vectorizer.joblib")

df = pd.read_csv("labeled_train.csv")
tfidf_vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf_vectorizer.fit_transform(df["Context"])

df = pd.read_csv(os.path.join(BASE_DIR, "labeled_train.csv"))
clf = joblib.load(os.path.join(BASE_DIR, "model.joblib"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "vectorizer.joblib"))

def classify_input_directly(text):
    vec = vectorizer.transform([text])
    pred = clf.predict(vec)[0]
    return int(pred)

# def find_best_match(user_input):
#     input_vec = tfidf_vectorizer.transform([user_input])
#     similarity_scores = cosine_similarity(input_vec, tfidf_matrix)
#     best_idx = similarity_scores.argmax()
#     best_score = similarity_scores[0, best_idx]

#     if best_score >= 0.3:
#         matched_context = df.iloc[best_idx]["Context"]
#         response_type = df.iloc[best_idx]["response_type"]
#         return {
#             "matched_context": matched_context,
#             "response_type": int(response_type),
#             "confidence": float(best_score),
#             "source": "dataset"
#         }
#     else:
#         fallback_prediction = classify_input_directly(user_input)
#         return {
#             "matched_context": None,
#             "response_type": fallback_prediction,
#             "confidence": 0,
#             "source": "model"
#         }

def find_best_match(user_input):
    input_vec = tfidf_vectorizer.transform([user_input])
    similarity_scores = cosine_similarity(input_vec, tfidf_matrix)
    best_idx = similarity_scores.argmax()
    best_score = similarity_scores[0, best_idx]

    matched_context = df.iloc[best_idx]["Context"]
    matched_response = df.iloc[best_idx]["Response"]
    response_type = df.iloc[best_idx]["response_type"]

    if best_score >= 0.3:
        source = "dataset"
    else:
        source = "model"
        response_type = classify_input_directly(user_input)

    return {
        "matched_context": matched_context,
        "matched_response": matched_response,
        "response_type": int(response_type),
        "confidence": float(best_score),
        "source": source
    }


def get_llm_advice(user_input):
    prompt = f"""
    You are a helpful AI assistant for mental health counselors. A counselor needs advice for a patient who said:
    \"{user_input}\"

    What suggestions or insights would you give the counselor to help the patient?
    """
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an expert assistant helping mental health counselors."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
