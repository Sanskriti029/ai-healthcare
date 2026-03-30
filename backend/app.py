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
from functools import wraps
from flask_jwt_extended import get_jwt
from streamlit import user




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

from datetime import timedelta
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=5)
# -----------------------
# ADVANCED OFFLINE MEDICAL ANALYZER
# -----------------------

import re

def detect_duration_severity(text):
    text = text.lower()

    # Detect days
    days_match = re.search(r'(\d+)\s*day', text)
    if days_match:
        days = int(days_match.group(1))
        if days >= 5:
            return "High"
        elif days >= 3:
            return "Medium"

    # Detect weeks
    if "week" in text:
        return "High"

    return "Low"


def detect_intensity_severity(text):
    text = text.lower()

    if any(word in text for word in ["severe", "extreme", "unbearable", "worst"]):
        return "High"

    if any(word in text for word in ["moderate", "persistent"]):
        return "Medium"

    if any(word in text for word in ["mild", "light"]):
        return "Low"

    return "Low"
def analyze_symptoms_ai(symptoms):
    
    symptoms_lower = symptoms.lower()

    possible_conditions = []
    suggested_medicines = []
    recommendations = []

    severity = "Low"
    suggested_department = "General Physician"
    emergency_flag = False

    severity_levels = {"Low":1,"Medium":2,"High":3,"Emergency":4}

    def update_severity(current, new):
        levels = {"Low":1,"Medium":2,"High":3,"Emergency":4}
        return new if levels[new] > levels[current] else current

    def set_department(dept):
        nonlocal suggested_department
        priority = ["Cardiology","Neurology","Pulmonologist"]
        if suggested_department == "General Physician" or dept in priority:
            suggested_department = dept
    

# Detect from duration + intensity first
    duration_sev = detect_duration_severity(symptoms_lower)
    intensity_sev = detect_intensity_severity(symptoms_lower)

    severity = update_severity(severity, duration_sev)
    severity = update_severity(severity, intensity_sev)
    # ---------------- EMERGENCY ----------------
    if "chest pain" in symptoms_lower:
        possible_conditions.append({"name":"Cardiac Issue","probability":"High","description":"Chest pain may indicate heart-related condition."})
        severity = update_severity(severity, "Emergency")
        set_department("Cardiology")
        emergency_flag = True
        recommendations.append("Seek immediate medical attention.")
       

    if "heart attack" in symptoms_lower:
        possible_conditions.append({"name":"Heart Attack","probability":"High","description":"Blocked blood flow to heart muscle. This is a life-threatening emergency."})
        severity = update_severity(severity, "Emergency")
        set_department("Cardiology")
        emergency_flag = True
        recommendations.append("Call emergency services immediately.")
        suggested_medicines.append({"name":"Aspirin","type":"OTC","dosage":"As advised","notes":"Only if not allergic"})
        
    # ---------------- FEVER ----------------
    if "fever" in symptoms_lower:
        possible_conditions.append({"name":"Viral Fever","probability":"High","description":"Common infection"})
        suggested_medicines.append({"name":"Paracetamol (Crocin / Calpol)","type":"OTC","dosage": "500-650mg every 6-8 hours",
            "notes": "Do not exceed 4g per day."})
        recommendations.append("Stay hydrated and take proper rest.")
        severity = update_severity(severity, "Medium")

    # ---------------- COLD / COUGH ----------------
    if "cold" in symptoms_lower or "cough" in symptoms_lower:
        possible_conditions.append({"name":"Common Cold","probability":"High","description":"Respiratory infection"})
        suggested_medicines.append({"name": "Cough Syrup (Dextromethorphan) (Benadryl / Corex) ", "type":"OTC","dosage":"10ml twice daily",
            "notes": "Follow label instructions."})
        recommendations.append("Drink warm fluids and avoid cold drinks.")
        severity = update_severity(severity, "Medium")

    # ---------------- HEADACHE ----------------
    if "headache" in symptoms_lower:
        possible_conditions.append({"name":"Headache","probability":"Medium","description":"Stress-related"})
        suggested_medicines.append({"name":"Ibuprofen (Brufen)","type":"OTC","dosage":"200-400mg every 6 hours",
            "notes": "Take after food."})
        recommendations.append("Take rest and reduce stress.")
        severity = update_severity(severity, "Low")
        set_department("Neurology")

    # ---------------- MIGRAINE ----------------
    if "migraine" in symptoms_lower:
        possible_conditions.append({"name":"Migraine","probability":"High","description":"Severe headache"})
        recommendations.append("Avoid bright light and loud noise.")
        severity = update_severity(severity, "Medium")
        set_department("Neurology")

    # ---------------- BREATHING ----------------
    if "breath" in symptoms_lower:
        possible_conditions.append({"name":" Asthma / Respiratory Issue","probability":"High","description":"Breathing difficulty"})
        recommendations.append("Use inhaler if prescribed and seek urgent care.")
        severity = update_severity(severity, "High")
        set_department("Pulmonology")

    # ---------------- STOMACH ----------------
    if "stomach pain" in symptoms_lower:
        possible_conditions.append({"name":"Gastritis","probability":"Medium","description":"Stomach inflammation"})
        suggested_medicines.append({"name":"Antacid (Digene / Gelusil)","type":"OTC","dosage":"After meals", "notes": "Avoid spicy food."})
        recommendations.append("Eat light food.")
        severity = update_severity(severity, "Medium")
        set_department("Gastroenterology")

    # ---------------- VOMITING ----------------
    if "vomiting" in symptoms_lower or "diarrhea" in symptoms_lower:
        possible_conditions.append({"name":"Food Poisoning","probability":"High","description":"Food infection"})
        suggested_medicines.append({"name":"ORS","type":"OTC","dosage":"After each loose motion", "notes": "Prevent dehydration."})
        recommendations.append("Drink fluids to prevent dehydration.")
        severity = update_severity(severity, "Medium")
        set_department("Gastroenterology")

    # ---------------- RASH ----------------
    if "rash" in symptoms_lower:
        possible_conditions.append({"name":"Allergic Reaction","probability":"Medium","description":"Skin issue"})
        suggested_medicines.append({"name":"Cetirizine (Zyrtec / Alerid)","type":"OTC","dosage":"10mg", "notes": "May cause drowsiness."})
        recommendations.append("Avoid allergens.")
        severity = update_severity(severity, "Medium")
        set_department("Dermatology")

    # ---------------- EAR ----------------
    if "ear pain" in symptoms_lower:
        possible_conditions.append({"name":"Ear Infection","probability":"Medium","description":"Middle ear infection"})
        recommendations.append("Avoid water in ear.")
        
        set_department("ENT Specialist")

    # ---------------- EYE ----------------
    if "eye redness" in symptoms_lower:
        possible_conditions.append({"name":"Conjunctivitis","probability":"Medium","description":"Eye infection"})
        recommendations.append("Avoid touching eyes.")
        set_department("Ophthalmologist")

    # ---------------- DIABETES ----------------
    if "frequent urination" in symptoms_lower or "excess thirst" in symptoms_lower:
        possible_conditions.append({"name":"Possible Diabetes","probability":"Medium","description":"High blood sugar"})
        recommendations.append("Check blood sugar levels.")
        set_department("Endocrinologist")

    # ---------------- PAIN ----------------
    if "back pain" in symptoms_lower or "leg pain" in symptoms_lower:
        possible_conditions.append({"name":"Muscle Strain","probability":"Medium","description":"Strain"})
        recommendations.append("Rest and apply ice.")
        set_department("Orthopedics")
        
    if "hand pain" in symptoms_lower or "arm pain" in symptoms_lower:
        possible_conditions.append({
            "name": "Muscle Strain",
            "probability": "Medium",
            "description": "Overuse or minor injury."
        })
        suggested_medicines.append({
            "name": "Diclofenac Gel (Volini)",
            "type": "OTC",
            "dosage": "Apply twice daily",
            "notes": "External use only."
        })
        recommendations.append("Rest the affected limb and apply ice.")
        set_department("Orthopedics")
        #     # ---------------- STROKE SIGNS ----------------
    if "numbness" in symptoms_lower and "face" in symptoms_lower:
        possible_conditions.append({
            "name": "Possible Stroke",
            "probability": "High",
            "description": "Sudden weakness or numbness."
        })
        severity = update_severity(severity, "Emergency")
        recommendations.append("Call emergency immediately.")
# ---------------- INJURY ----------------
    # FINGER CUT
    if "finger cut" in symptoms_lower or "cut" in symptoms_lower:
        possible_conditions.append({
            "name": "Minor Laceration",
            "probability": "High",
            "description": "Superficial skin injury."
        })
        suggested_medicines.append({
            "name": "Antiseptic Cream (Soframycin / Betadine)",
            "type": "OTC",
            "dosage": "Apply after cleaning wound",
            "notes": "Keep wound clean and dry."
        })
        recommendations.append("Clean wound with antiseptic solution.")
        set_department("General Physician")
        update_severity("Low")
    
    if "cut" in symptoms_lower:
        possible_conditions.append({"name":"Minor Injury","probability":"High","description":"Surface wound"})
        suggested_medicines.append({"name":"Antiseptic Cream","type":"OTC","dosage":"Apply locally"})
        recommendations.append("Clean wound properly.")
        update_severity("Medium")
        set_department("General Physician")
        #  ----------------NOSE BLEEDING  ---------------- 
    if "nose bleeding" in symptoms_lower:
        possible_conditions.append({
            "name": "Epistaxis",
            "probability": "Medium",
            "description": "Bleeding from nasal cavity."
        })
        recommendations.append("Pinch nose and lean forward for 10 minutes.")
        update_severity("Medium")

    # ---------------- DEFAULT ----------------
    if not possible_conditions:
        possible_conditions.append({"name":"General Weakness","probability":"Low","description":"Could be due to stress or mild infection."})
        recommendations.append("Rest and monitor symptoms.")


    if emergency_flag:
        recommendations.append("🚨 Go to hospital immediately.")

    return {
        "possibleConditions": possible_conditions,
        "suggestedMedicines": suggested_medicines,
        "suggestedDepartment": suggested_department,
        "severity": severity,
        "priority": severity,
        "recommendations": recommendations,
        "whenToSeeDoctor": "If symptoms persist more than 3 days.",
        "disclaimer": "AI only. Not a medical diagnosis."
    }





def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        role = claims.get("role")

        if role != "admin":
            return jsonify({"error": "Admin access required"}), 403

        return fn(*args, **kwargs)

    return wrapper

# -----------------------
# DATABASE MODELS
# -----------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(200))
    role = db.Column(db.String(20), default="user")
    
class Triage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    symptoms = db.Column(db.Text)
    severity = db.Column(db.String(50))

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    patient_name = db.Column(db.String(100), nullable=False)

    doctor_id = db.Column(db.Integer)
    doctor_name = db.Column(db.String(100))

    department = db.Column(db.String(100))
    priority = db.Column(db.String(50))

    date = db.Column(db.String(50))
    time_slot = db.Column(db.String(50))

    status = db.Column(db.String(50), default="Pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # ✅ THIS LINE FIXES EVERYTHING
    __table_args__ = (
        db.UniqueConstraint('doctor_id', 'date', 'time_slot', name='unique_slot'),
    )

class DoctorAvailability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer)
    date = db.Column(db.String(20))
    time_slot = db.Column(db.String(20))   # ✅ NEW
    status = db.Column(db.String(20))  # free / busy


class Hospital(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    address = db.Column(db.String(300))
    city = db.Column(db.String(100))
    phone = db.Column(db.String(20))


class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    specialization = db.Column(db.String(200))
    experience = db.Column(db.Integer)  # years
    hospital_name = db.Column(db.String(200))
    city = db.Column(db.String(100))
    phone = db.Column(db.String(20))


class Pharmacy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    address = db.Column(db.String(300))
    city = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    open_24hrs = db.Column(db.Boolean, default=False)
    area = db.Column(db.String(100))  # New field for area/locality

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
@admin_required
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
@admin_required
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
    doctors = Doctor.query.all()

    return jsonify([
        {
            "id": d.id,
            "name": d.name,
            "department": d.specialization,
            "experience": d.experience,
            "hospital": d.hospital_name,
            "city": d.city,
            "phone": d.phone
            
        }
        for d in doctors
    ])
from sqlalchemy.exc import IntegrityError

@app.route("/api/appointments", methods=["POST"])
@jwt_required()
def create_appointment():
    user_id = get_jwt_identity()  # ✅ get logged-in user

    data = request.json

    doctor = Doctor.query.get(data["doctor_id"])

    appointment = Appointment(
        user_id=user_id,  # ✅ dynamic user
        patient_name=data["patient_name"],
        doctor_id=data["doctor_id"],
        doctor_name=doctor.name,
        department=doctor.specialization,
        date=data["date"],
        time_slot=data["time_slot"],
        status="Pending",
        priority=data.get("priority", "Low")
    )

    db.session.add(appointment)
    db.session.commit()

    return jsonify({"message": "Appointment booked"})





    
@app.route("/api/appointments/<int:id>", methods=["PUT"])
@jwt_required()
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



#real data integration

@app.route("/api/doctors/<int:doctor_id>/availability")
def doctor_availability(doctor_id):
    from datetime import date, timedelta

    # Default slots
    default_slots = [
        "09:00", "10:00", "11:00",
        "12:00", "14:00", "15:00", "16:00"
    ]

    availability = {}

    today = date.today()

    for i in range(30):
        d = today + timedelta(days=i)
        day_str = d.strftime("%Y-%m-%d")

        # Get booked slots
        bookings = Appointment.query.filter_by(
            doctor_id=doctor_id,
            date=day_str
        ).all()

        booked_slots = [b.time_slot for b in bookings]

        slots = {}
        for slot in default_slots:
            if slot in booked_slots:
                slots[slot] = "busy"
            else:
                slots[slot] = "free"

        availability[day_str] = slots

    return jsonify(availability)

@app.route("/api/appointments", methods=["GET"])
def get_appointments():
    appointments = Appointment.query.order_by(Appointment.created_at.desc()).all()

    return jsonify([
        {
            "id": a.id,
            "patient_name": a.patient_name,
            "doctor_name": a.doctor_name,
            "department": a.department,
            "priority": a.priority,
            "date": a.date,
            "time_slot": a.time_slot,
            "status": a.status
        }
        for a in appointments
    ])




#queue system 
@app.route('/api/queue', methods=['GET'])
@jwt_required()
def get_queue():
    user_id = get_jwt_identity()  # 🔥 real user now

    waiting = Appointment.query.filter_by(status="Pending")
    consultation = Appointment.query.filter_by(status="In Consultation").all()

    return jsonify({
        "waiting": [
            {
                "id": a.id,
                "patient": a.patient_name,
                "isMe": a.user_id == int(user_id)  # ✅ match logged-in user
            } for a in waiting
        ],
        "consultation": [
            {
                "id": a.id,
                "patient": a.patient_name,
                "isMe": a.user_id == int(user_id)
            } for a in consultation
        ]
    })


# -----------------------
# databases  ROUTES
# -----------------------
# -----------------------
# USER DASHBOARD APIs
# -----------------------

@app.route("/api/user/appointments/<int:user_id>")
def get_user_appointments(user_id):
    appointments = Appointment.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": a.id,
            "patient_name": a.patient_name,
            "doctor_name": a.doctor_name,
            "department": a.department,
            "priority": a.priority,
            "date": a.date,
            "time_slot": a.time_slot,
            "status": a.status
        }
        for a in appointments
    ])


@app.route("/api/user/book", methods=["POST"])
def book_appointment():
    data = request.get_json()

    new_appointment = Appointment(
        user_id=data["user_id"],
        patient_name=data["patient_name"],
        doctor_id=data.get("doctor_id"),
        doctor_name=data.get("doctor_name"),
        department=data["department"],
        priority=data.get("priority", "Low"),
        date=data["date"],
        time_slot=data["time_slot"],
        status="Pending"
    )

    try:
        db.session.add(new_appointment)
        db.session.commit()
        return jsonify({"message": "Appointment booked successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    
@app.route("/api/doctors/<city>")
def get_doctors_by_city(city):
    doctors = Doctor.query.filter(Doctor.city.ilike(city)).all()

    result = []
    for d in doctors:
        result.append({
            "id": d.id,
            "name": d.name,
            "specialization": d.specialization,
            "experience": d.experience,
            "hospital": d.hospital_name,
            "phone": d.phone
        })

    return jsonify(result)

@app.route("/api/pharmacies/<city>", methods=["GET"])
def get_pharmacies_by_city(city):
    pharmacies = Pharmacy.query.filter(Pharmacy.city.ilike(city)).all()

    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "address": p.address,
            "phone": p.phone,
            "open_24hrs": p.open_24hrs,
            "area": p.area
        }
        for p in pharmacies
    ])

@app.route("/api/pharmacies/<area>", methods=["GET"])
def get_pharmacies_by_area(area):
    pharmacies = Pharmacy.query.filter(Pharmacy.area.ilike(area)).all()

    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "address": p.address,
            "phone": p.phone,
            "open_24hrs": p.open_24hrs,
            "area": p.area
        }
        for p in pharmacies
    ])

@app.route("/api/hospitals/<city>")
def get_hospitals_by_city(city):
    hospitals = Hospital.query.filter(
        Hospital.city.ilike(city)
    ).all()

    return jsonify([
        {
            "id": h.id,
            "name": h.name,
            "address": h.address,
            "city": h.city,
            "phone": h.phone
        }
        for h in hospitals
    ])
@app.route("/api/hospital/<name>")
def get_hospital_by_name(name):
    hospital = Hospital.query.filter(
        Hospital.name.ilike(name)
    ).first()

    if not hospital:
        return jsonify({"error": "Hospital not found"}), 404

    return jsonify({
        "id": hospital.id,
        "name": hospital.name,
        "address": hospital.address,
        "city": hospital.city,
        "phone": hospital.phone
    })
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

# @app.route("/login", methods=["POST"])
# def login():
#     data = flask.request.json
#     user = User.query.filter_by(email=data["email"]).first()
#     if user and bcrypt.check_password_hash(user.password, data["password"]):
#         token = create_access_token(identity=user.id)
#         return flask.jsonify({"token": token})
#     return flask.jsonify({"message": "Invalid credentials"}), 401

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()

    if user and bcrypt.check_password_hash(user.password, data["password"]):
        token = create_access_token(
            identity=str(user.id),   # ✅ store user_id
            additional_claims={
                "role": user.role     # ✅ store role (admin/user)
            }
        )

        return jsonify({
            "token": token,
            "user_id": user.id,
            "role": user.role
        })

    return jsonify({"message": "Invalid credentials"}), 401


@app.route("/resetpassword", methods=["POST"])
def reset_password():
    data = request.get_json()

    email = data.get("email")
    new_password = data.get("newPassword")

    if not email or not new_password:
        return jsonify({"msg": "Missing data"}), 400

    # 🔍 Find user
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    # 🔐 Hash password using bcrypt
    hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")

    user.password = hashed_password
    db.session.commit()

    return jsonify({"msg": "Password reset successful ✅"})
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

        from seed_data import seed_extra_data
        seed_extra_data(db, Hospital, Doctor, Pharmacy)

        # ✅ FIXED ADMIN CREATION
        admin = User.query.filter_by(email="admin@gmail.com").first()

        if not admin:
            admin = User(
                name="Admin",
                email="admin@gmail.com",
                password=bcrypt.generate_password_hash("admin123").decode("utf-8"),
                role="admin"
            )
            db.session.add(admin)
            db.session.commit()

    app.run(debug=True, port=5000)

        # if User.query.filter_by(email="admin@gmail.com").first() is None:
        #         admin_user = User(
        #      name="Admin",
        #      email="admin@gmail.com",
        #     password=bcrypt.generate_password_hash("admin123").decode("utf-8"),
        #     role="admin"
        #      )
        #     db.session.add(admin_user)
        #     db.session.commit()
    # app.run(debug=True, port=5000)