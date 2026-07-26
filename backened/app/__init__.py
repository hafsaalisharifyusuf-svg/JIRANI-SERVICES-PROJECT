from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

from .config import Config
from .models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'profiles'), exist_ok=True)
    os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'ids'), exist_ok=True)
    
    # ✅ FIX: Allow all origins with proper CORS
    CORS(app, 
         resources={r"/*": {"origins": "*"}},
         allow_headers=["Content-Type", "Authorization", "Accept"],
         methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    )
    
    JWTManager(app)
    db.init_app(app)
    
    from .routes.auth import auth_bp
    from .routes.workers import workers_bp
    from .routes.bookings import bookings_bp
    from .routes.applications import applications_bp
    from .routes.admin import admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(workers_bp, url_prefix='/api/workers')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(applications_bp, url_prefix='/api/applications')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    with app.app_context():
        db.create_all()
    
    return app
