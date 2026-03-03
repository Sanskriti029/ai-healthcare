# backend/app.py

from flask import Flask, request, jsonify
import flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO
# socketio = SocketIO(app, cors_allowed_origins="*")
from datetime import datetime





# -----------------------

# APP CONFIG
# -----------------------
app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///healthcare.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret-key-change-this"

CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# -----------------------
# ADVANCED OFFLINE MEDICAL ANALYZER
# -----------------------
def analyze_symptoms_ai(symptoms):
    symptoms_lower = symptoms.lower()

    possible_conditions = []
    suggested_medicines = []
   
    recommendations = []
    emergency_flag = False

    # FEVER
    if "fever" in symptoms_lower:
        possible_conditions.append({
            "name": "Viral Fever / Flu",
            "probability": "High",
            "description": "Common viral infection causing fever and weakness."
        })
        suggested_medicines.append({
            "name": "Paracetamol",
            "type": "OTC",
            "dosage": "500-650mg every 6-8 hours",
            "notes": "Do not exceed 4g per day."
        })
        recommendations.append("Stay hydrated and take proper rest.")
        
         # ---------------- BREATHING PROBLEM ----------------
    if "breath" in symptoms_lower or "shortness of breath" in symptoms_lower:
        possible_conditions.append({
            "name": "Asthma / Respiratory Issue",
            "probability": "High",
            "description": "Breathing difficulty."
        })
        
        recommendations.append("Use inhaler if prescribed and seek urgent care.")
           # ---------------- HEADACHE ----------------
    if "headache" in symptoms_lower:
        possible_conditions.append({
            "name": "Tension Headache",
            "probability": "Medium",
            "description": "Stress-related headache."
        })
        suggested_medicines.append({
            "name": "Ibuprofen",
            "type": "OTC",
            "dosage": "200-400mg every 6 hours",
            "notes": "Take after food."
        })
        recommendations.append("Reduce stress and rest.")
     

    # ---------------- MIGRAINE ----------------
    if "migraine" in symptoms_lower:
        possible_conditions.append({
            "name": "Migraine",
            "probability": "High",
            "description": "Severe throbbing headache."
        })
       
        recommendations.append("Avoid bright light and loud noise.")
    # COLD / COUGH
    if "cold" in symptoms_lower or "cough" in symptoms_lower:
        possible_conditions.append({
            "name": "Common Cold",
            "probability": "High",
            "description": "Upper respiratory tract infection."
        })
        suggested_medicines.append({
            "name": "Cough Syrup (Dextromethorphan)",
            "type": "OTC",
            "dosage": "10ml twice daily",
            "notes": "Follow label instructions."
        })
        recommendations.append("Drink warm fluids and avoid cold drinks.")
         # ---------------- FOOD POISONING ----------------
    if "vomiting" in symptoms_lower or "diarrhea" in symptoms_lower:
        possible_conditions.append({
            "name": "Food Poisoning",
            "probability": "High",
            "description": "Infection from contaminated food."
        })
        suggested_medicines.append({
            "name": "ORS",
            "type": "OTC",
            "dosage": "After each loose motion",
            "notes": "Prevent dehydration."
        })
          # ---------------- SKIN RASH ----------------
    if "rash" in symptoms_lower:
        possible_conditions.append({
            "name": "Allergic Reaction",
            "probability": "Medium",
            "description": "Skin irritation due to allergy."
        })
        suggested_medicines.append({
            "name": "Cetirizine",
            "type": "OTC",
            "dosage": "10mg once daily",
            "notes": "May cause drowsiness."
        })
        
    # ---------------- EYE REDNESS ----------------
    if "eye redness" in symptoms_lower:
        possible_conditions.append({
            "name": "Conjunctivitis",
            "probability": "Medium",
            "description": "Eye infection."
        })
        

    # ---------------- DIABETES SYMPTOMS ----------------
    if "frequent urination" in symptoms_lower or "excess thirst" in symptoms_lower:
        possible_conditions.append({
            "name": "Possible Diabetes",
            "probability": "Medium",
            "description": "High blood sugar symptoms."
        })
      

    # ---------------- STROKE SIGNS ----------------
    if "numbness" in symptoms_lower and "face" in symptoms_lower:
        possible_conditions.append({
            "name": "Possible Stroke",
            "probability": "High",
            "description": "Sudden weakness or numbness."
        })
        severity = "Emergency"
        recommendations.append("Call emergency immediately.")
    # HEADACHE
    if "headache" in symptoms_lower:
        possible_conditions.append({
            "name": "Tension Headache",
            "probability": "Medium",
            "description": "Common stress-related headache."
        })
        suggested_medicines.append({
            "name": "Ibuprofen",
            "type": "OTC",
            "dosage": "200-400mg every 6 hours",
            "notes": "Take after food."
        })
        recommendations.append("Reduce stress and sleep properly.")
          # ---------------- EAR PAIN ----------------
    if "ear pain" in symptoms_lower:
        possible_conditions.append({
            "name": "Ear Infection",
            "probability": "Medium",
            "description": "Middle ear infection."
        })
    # CHEST PAIN (EMERGENCY)
    if "chest pain" in symptoms_lower:
        possible_conditions.append({
            "name": "Possible Cardiac Issue",
            "probability": "High",
            "description": "Chest pain may indicate heart-related condition."
        })
        severity = "Emergency"
        emergency_flag = True
        recommendations.append("Seek immediate medical attention.")
       # ---------------- HEART ATTACK (EMERGENCY) ----------------
    if "heart attack" in symptoms_lower or "cardiac arrest" in symptoms_lower: 
      possible_conditions.append({
        "name": "Possible Heart Attack (Myocardial Infarction)",
        "probability": "High",
        "description": "Blocked blood flow to heart muscle. This is a life-threatening emergency."
    })
    severity = "Emergency"
    emergency_flag = True
    recommendations.append("Call emergency services immediately.")
    recommendations.append("Chew aspirin (if not allergic) while waiting for help.")

    
    # HAND / ARM PAIN
    if "hand pain" in symptoms_lower or "arm pain" in symptoms_lower:
        possible_conditions.append({
            "name": "Muscle Strain",
            "probability": "Medium",
            "description": "Overuse or minor injury."
        })
        suggested_medicines.append({
            "name": "Diclofenac Gel",
            "type": "OTC",
            "dosage": "Apply twice daily",
            "notes": "External use only."
        })
        recommendations.append("Rest the affected limb and apply ice.")

    # LEG PAIN
    if "leg pain" in symptoms_lower:
        possible_conditions.append({
            "name": "Muscle Fatigue",
            "probability": "Medium",
            "description": "Common after physical exertion."
        })
        recommendations.append("Elevate leg and rest.")

    # FINGER CUT
    if "finger cut" in symptoms_lower or "cut" in symptoms_lower:
        possible_conditions.append({
            "name": "Minor Laceration",
            "probability": "High",
            "description": "Superficial skin injury."
        })
        suggested_medicines.append({
            "name": "Antiseptic Cream",
            "type": "OTC",
            "dosage": "Apply after cleaning wound",
            "notes": "Keep wound clean and dry."
        })
        recommendations.append("Clean wound with antiseptic solution.")

    # NOSE BLEEDING
    if "nose bleeding" in symptoms_lower:
        possible_conditions.append({
            "name": "Epistaxis",
            "probability": "Medium",
            "description": "Bleeding from nasal cavity."
        })
        recommendations.append("Pinch nose and lean forward for 10 minutes.")
        severity = "Medium"

    # STOMACH PAIN
    if "stomach pain" in symptoms_lower or "abdominal pain" in symptoms_lower:
        possible_conditions.append({
            "name": "Gastritis",
            "probability": "Medium",
            "description": "Inflammation of stomach lining."
        })
        suggested_medicines.append({
            "name": "Antacid",
            "type": "OTC",
            "dosage": "After meals",
            "notes": "Avoid spicy food."
        })
        recommendations.append("Eat light food.")

    # VOMITING / DIARRHEA
    if "vomiting" in symptoms_lower or "diarrhea" in symptoms_lower:
        possible_conditions.append({
            "name": "Food Poisoning",
            "probability": "High",
            "description": "Infection from contaminated food."
        })
        suggested_medicines.append({
            "name": "ORS",
            "type": "OTC",
            "dosage": "After each loose motion",
            "notes": "Prevent dehydration."
        })
        severity = "Medium"
        recommendations.append("Drink plenty of fluids.")

    # BACK PAIN
    if "back pain" in symptoms_lower:
        possible_conditions.append({
            "name": "Lower Back Strain",
            "probability": "Medium",
            "description": "Muscle strain or posture issue."
        })
        recommendations.append("Avoid heavy lifting.")

    # DEFAULT CONDITION
    if not possible_conditions:
        possible_conditions.append({
            "name": "General Weakness",
            "probability": "Low",
            "description": "Could be due to stress or mild infection."
        })
        recommendations.append("Monitor symptoms and rest.")

    if emergency_flag:
        recommendations.append("Call emergency services immediately.")

    return {
        "possibleConditions": possible_conditions,
        "suggestedMedicines": suggested_medicines,
        "severity": severity,
        "recommendations": recommendations,
        "whenToSeeDoctor": "If symptoms persist more than 3 days or worsen.",
        "disclaimer": "This is AI-generated and not a substitute for professional medical advice."
    }

# -----------------------
# DATABASE MODELS
# -----------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(200))

class Triage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    symptoms = db.Column(db.Text)
    severity = db.Column(db.String(50))

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    patient_name = db.Column(db.String(100), nullable=False)
    doctor_name = db.Column(db.String(100))
    department = db.Column(db.String(100))
    priority = db.Column(db.String(50))
    date = db.Column(db.String(50))
    status = db.Column(db.String(50), default="Pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# -----------------------
# PUBLIC AI ROUTE
# -----------------------
@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    symptoms = data.get("symptoms", "")

    if not symptoms or len(symptoms.strip()) < 3:
        return jsonify({"error": "Please describe your symptoms"}), 400

    result = analyze_symptoms_ai(symptoms)

    # Save to database
    record = Triage(
        user_id=1,  # temporary user
        symptoms=symptoms,
        severity=result["severity"]
    )

    db.session.add(record)
    db.session.commit()

    return jsonify(result)


@app.route("/api/dashboard/stats")
def dashboard_stats():
    total_triage = Triage.query.count()
    total_appointments = Appointment.query.count()
    pending = Appointment.query.filter_by(status="Pending").count()
    completed = Appointment.query.filter_by(status="Completed").count()
    emergency = Triage.query.filter_by(severity="Emergency").count()

    return jsonify({
        "total_patients": total_triage,
        "total_appointments": total_appointments,
        "waiting": pending,
        "completed": completed,
        "emergency": emergency
    })
    

@app.route("/api/patients")
def get_patients():
    records = Triage.query.all()
    return jsonify([
        {
            "id": r.id,
            "symptoms": r.symptoms,
            "severity": r.severity
        }
        for r in records
    ])

@app.route("/api/doctors")
def get_doctors():
    return flask.jsonify([
        {"id": 1, "name": "Dr. Sharma", "department": "Cardiology"},
        {"id": 2, "name": "Dr. Mehta", "department": "Neurology"},
        {"id": 3, "name": "Dr. Rao", "department": "General"}
    ])


@app.route("/api/appointments", methods=["POST"])
# @jwt_required()
def create_appointment():
    # user_id = get_jwt_identity()
    user_id = 1  # temporary dummy user
    data = flask.request.json

    appointment = Appointment(
        user_id=user_id,
        patient_name=data["patient_name"],
        doctor_name=data["doctor_name"],
        department=data["department"],
        priority=data["priority"],
        date=data["date"],
        status="Pending"
    )

    db.session.add(appointment)
    db.session.commit()

    return flask.jsonify({"message": "Appointment created"})




@app.route("/api/appointments", methods=["GET"])
def get_appointments():
    appointments = Appointment.query.all()

    return flask.jsonify([
        {
            "id": a.id,
            "patient_name": a.patient_name,
            "doctor_name": a.doctor_name,
            "priority": a.priority,
            "status": a.status,
            "date": a.date
        }
        for a in appointments
    ])

@app.route("/api/appointments/<int:id>", methods=["PUT"])
# @jwt_required()
def update_appointment(id):
    data = request.get_json()
    status = data.get("status")

    appointment = Appointment.query.get(id)

    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    appointment.status = status
    db.session.commit()

    return jsonify({"message": "Appointment updated successfully"})

# delete appointmnet
@app.route("/api/appointments/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    appointment = Appointment.query.get(id)

    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    db.session.delete(appointment)
    db.session.commit()

    return jsonify({"message": "Appointment deleted successfully"})

# -----------------------
# AUTH ROUTES
# -----------------------
@app.route("/register", methods=["POST"])
def register():
    data = flask.request.json
    if User.query.filter_by(email=data["email"]).first():
        return flask.jsonify({"message": "Email already exists"}), 400

    hashed = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user = User(name=data["name"], email=data["email"], password=hashed)
    db.session.add(user)
    db.session.commit()
    return flask.jsonify({"message": "User registered successfully"})

@app.route("/login", methods=["POST"])
def login():
    data = flask.request.json
    user = User.query.filter_by(email=data["email"]).first()
    if user and bcrypt.check_password_hash(user.password, data["password"]):
        token = create_access_token(identity=user.id)
        return flask.jsonify({"token": token})
    return flask.jsonify({"message": "Invalid credentials"}), 401

# -----------------------
# PROTECTED TRIAGE ROUTE
# -----------------------
@app.route("/triage", methods=["POST"])
@jwt_required()
def triage():
    user_id = get_jwt_identity()
    data = flask.request.json
    symptoms = data.get("symptoms", "")

    ai_result = analyze_symptoms_ai(symptoms)
    severity = ai_result.get("severity", "Unknown")

    record = Triage(user_id=user_id, symptoms=symptoms, severity=severity)
    db.session.add(record)
    db.session.commit()

    return flask.jsonify(ai_result)

# -----------------------
# RUN APP
# -----------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)