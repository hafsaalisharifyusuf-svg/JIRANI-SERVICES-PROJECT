from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='customer')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Worker(db.Model):
    __tablename__ = 'workers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    profession = db.Column(db.String(50), nullable=False)
    county = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    skills = db.Column(db.String(255))
    experience = db.Column(db.String(50))
    bio = db.Column(db.Text)
    is_verified = db.Column(db.Boolean, default=True)
    is_available = db.Column(db.Boolean, default=True)
    response_time = db.Column(db.String(20))
    profile_image = db.Column(db.String(255))
    status = db.Column(db.String(20), default='approved')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    bookings = db.relationship('Booking', backref='worker', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'profession': self.profession,
            'county': self.county,
            'price': self.price,
            'skills': self.skills.split(',') if self.skills else [],
            'experience': self.experience,
            'bio': self.bio,
            'is_verified': self.is_verified,
            'is_available': self.is_available,
            'response_time': self.response_time,
            'profile_image': self.profile_image,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('workers.id'), nullable=False)
    customer_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    date_needed = db.Column(db.String(20), nullable=False)
    time_needed = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text)
    notes = db.Column(db.Text)
    amount = db.Column(db.Float)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'worker_id': self.worker_id,
            'worker_name': self.worker.name if self.worker else None,
            'customer_name': self.customer_name,
            'email': self.email,
            'phone': self.phone,
            'location': self.location,
            'date_needed': self.date_needed,
            'time_needed': self.time_needed,
            'description': self.description,
            'notes': self.notes,
            'amount': self.amount,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Application(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    profession = db.Column(db.String(50), nullable=False)
    county = db.Column(db.String(50), nullable=False)
    skills = db.Column(db.String(255))
    experience = db.Column(db.String(50))
    hourly_rate = db.Column(db.Float)
    bio = db.Column(db.Text)
    profile_image = db.Column(db.String(255))
    id_document = db.Column(db.String(255))
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'phone': self.phone,
            'email': self.email,
            'profession': self.profession,
            'county': self.county,
            'skills': self.skills.split(',') if self.skills else [],
            'experience': self.experience,
            'hourly_rate': self.hourly_rate,
            'bio': self.bio,
            'profile_image': self.profile_image,
            'id_document': self.id_document,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Request(db.Model):
    __tablename__ = 'requests'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    date_needed = db.Column(db.String(20))
    time_needed = db.Column(db.String(20))
    budget = db.Column(db.Float)
    contact_phone = db.Column(db.String(20), nullable=False)
    contact_email = db.Column(db.String(100))
    status = db.Column(db.String(20), default='open')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'description': self.description,
            'location': self.location,
            'date_needed': self.date_needed,
            'time_needed': self.time_needed,
            'budget': self.budget,
            'contact_phone': self.contact_phone,
            'contact_email': self.contact_email,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
