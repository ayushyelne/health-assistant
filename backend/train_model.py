import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import joblib

# Load labeled data
df = pd.read_csv("labeled_train.csv")

# Basic clean
df = df.dropna(subset=["Response", "response_type"])

# Split data
X = df["Response"]
y = df["response_type"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# TF-IDF vectorization
vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Model training
clf = LogisticRegression()
clf.fit(X_train_vec, y_train)

# Evaluation
y_pred = clf.predict(X_test_vec)
print(classification_report(y_test, y_pred))

# Save model and vectorizer
joblib.dump(clf, "model.joblib")
joblib.dump(vectorizer, "vectorizer.joblib")

print("✅ Model and vectorizer saved!")
