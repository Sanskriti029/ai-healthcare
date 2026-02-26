from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(200))
    role = db.Column(db.String(20), default="patient")

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    department = db.Column(db.String(100))
    date = db.Column(db.String(50))
    status = db.Column(db.String(50), default="Pending")

class Triage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    symptoms = db.Column(db.Text)
    severity = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)