from flask import Blueprint, request, jsonify
from ..models import db, Booking, Worker

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify({
        'success': True,
        'count': len(bookings),
        'bookings': [b.to_dict() for b in bookings]
    })

@bookings_bp.route('/<int:id>', methods=['GET'])
def get_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    return jsonify({
        'success': True,
        'booking': booking.to_dict()
    })

@bookings_bp.route('/', methods=['POST'])
def create_booking():
    try:
        data = request.get_json()
        print('📥 Received booking:', data)
        
        required = ['worker_id', 'customer_name', 'phone', 'location', 'date_needed', 'time_needed']
        for field in required:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        worker = Worker.query.get(data.get('worker_id'))
        if not worker:
            return jsonify({'error': 'Worker not found'}), 404
        
        booking = Booking(
            worker_id=data.get('worker_id'),
            customer_name=data.get('customer_name'),
            email=data.get('email'),
            phone=data.get('phone'),
            location=data.get('location'),
            date_needed=data.get('date_needed'),
            time_needed=data.get('time_needed'),
            description=data.get('description'),
            notes=data.get('notes'),
            amount=worker.price,
            status='pending'
        )
        
        db.session.add(booking)
        db.session.commit()
        
        print('✅ Booking saved:', booking.to_dict())
        
        return jsonify({
            'success': True,
            'message': 'Booking created successfully',
            'booking': booking.to_dict()
        }), 201
    except Exception as e:
        print('❌ Error:', str(e))
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:id>/status', methods=['PATCH'])
def update_booking_status(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    data = request.get_json()
    status = data.get('status')
    
    valid_statuses = ['pending', 'accepted', 'completed', 'cancelled']
    if status not in valid_statuses:
        return jsonify({'error': 'Invalid status'}), 400
    
    booking.status = status
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': f'Booking {status} successfully',
        'booking': booking.to_dict()
    })

@bookings_bp.route('/<int:id>', methods=['DELETE'])
def delete_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    db.session.delete(booking)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Booking deleted successfully'
    })
