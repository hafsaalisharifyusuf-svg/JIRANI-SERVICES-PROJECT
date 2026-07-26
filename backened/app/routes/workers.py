from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from ..models import db, Worker

workers_bp = Blueprint('workers', __name__)

# ===== GET ALL WORKERS =====
@workers_bp.route('/', methods=['GET'])
def get_workers():
    workers = Worker.query.all()
    return jsonify({
        'success': True,
        'count': len(workers),
        'workers': [w.to_dict() for w in workers]
    })

# ===== GET SINGLE WORKER =====
@workers_bp.route('/<int:id>', methods=['GET'])
def get_worker(id):
    worker = Worker.query.get(id)
    if not worker:
        return jsonify({'error': 'Worker not found'}), 404
    return jsonify({
        'success': True,
        'worker': worker.to_dict()
    })

# ===== CREATE WORKER =====
@workers_bp.route('/', methods=['POST'])
@jwt_required()
def create_worker():
    data = request.get_json()
    
    required = ['name', 'profession', 'county', 'price']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    
    worker = Worker(
        name=data.get('name'),
        profession=data.get('profession'),
        county=data.get('county'),
        price=data.get('price'),
        skills=','.join(data.get('skills', [])) if data.get('skills') else None,
        experience=data.get('experience'),
        bio=data.get('bio'),
        is_verified=data.get('is_verified', True),
        is_available=data.get('is_available', True),
        response_time=data.get('response_time'),
        profile_image=data.get('profile_image'),
        status='approved'
    )
    
    db.session.add(worker)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Worker created successfully',
        'worker': worker.to_dict()
    }), 201

# ===== UPDATE WORKER =====
@workers_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_worker(id):
    worker = Worker.query.get(id)
    if not worker:
        return jsonify({'error': 'Worker not found'}), 404
    
    data = request.get_json()
    
    if data.get('name'): worker.name = data.get('name')
    if data.get('profession'): worker.profession = data.get('profession')
    if data.get('county'): worker.county = data.get('county')
    if data.get('price'): worker.price = data.get('price')
    if data.get('skills'): worker.skills = ','.join(data.get('skills'))
    if data.get('experience'): worker.experience = data.get('experience')
    if data.get('bio'): worker.bio = data.get('bio')
    if data.get('is_verified') is not None: worker.is_verified = data.get('is_verified')
    if data.get('is_available') is not None: worker.is_available = data.get('is_available')
    if data.get('response_time'): worker.response_time = data.get('response_time')
    if data.get('profile_image'): worker.profile_image = data.get('profile_image')
    if data.get('status'): worker.status = data.get('status')
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Worker updated successfully',
        'worker': worker.to_dict()
    })

# ===== DELETE WORKER =====
@workers_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_worker(id):
    worker = Worker.query.get(id)
    if not worker:
        return jsonify({'error': 'Worker not found'}), 404
    
    db.session.delete(worker)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Worker deleted successfully'
    })

# ===== UPDATE WORKER STATUS =====
@workers_bp.route('/<int:id>/status', methods=['PATCH'])
@jwt_required()
def update_worker_status(id):
    worker = Worker.query.get(id)
    if not worker:
        return jsonify({'error': 'Worker not found'}), 404
    
    data = request.get_json()
    status = data.get('status')
    
    if status not in ['pending', 'approved', 'rejected']:
        return jsonify({'error': 'Invalid status'}), 400
    
    worker.status = status
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': f'Worker {status} successfully',
        'worker': worker.to_dict()
    })
