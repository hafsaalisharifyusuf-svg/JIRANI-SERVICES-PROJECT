from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from ..models import db, Worker, Booking, Application

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    stats = {
        'total_workers': Worker.query.count(),
        'total_bookings': Booking.query.count(),
        'pending_applications': Application.query.filter_by(status='pending').count(),
        'completed_jobs': Booking.query.filter_by(status='completed').count()
    }
    
    return jsonify({
        'success': True,
        'stats': stats
    })
