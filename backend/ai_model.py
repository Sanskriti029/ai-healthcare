import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

MODEL_PATH = "triage_model.pkl"
VECTORIZER_PATH = "vectorizer.pkl"

# Sample training data
training_data = [
    ("I have mild headache and slight cold", "Low"),
    ("Fever and body pain since yesterday", "Medium"),
    ("Vomiting and high fever", "Medium"),
    ("Chest pain and difficulty breathing", "Emergency"),
    ("Severe bleeding after accident", "Emergency"),
    ("Small cut on finger", "Low"),
    ("Cough and sore throat", "Low"),
    ("Severe stomach pain and vomiting blood", "Emergency"),
    ("High fever for 3 days", "Medium"),
    ("Minor allergy rash", "Low"),
]

def train_model():
    texts = [item[0] for item in training_data]
    labels = [item[1] for item in training_data]

    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(texts)

    model = MultinomialNB()
    model.fit(X, labels)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)

    print("AI Model Trained Successfully")

def load_model():
    if not os.path.exists(MODEL_PATH):
        train_model()

    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    return model, vectorizer

def analyze_symptoms(text):
    model, vectorizer = load_model()

    text_vector = vectorizer.transform([text])
    prediction = model.predict(text_vector)

    return prediction[0]