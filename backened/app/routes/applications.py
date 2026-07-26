from flask import Blueprint, request, jsonify
from ..models import db, Application, Worker

applications_bp = Blueprint('applications', __name__)

# ===== GET ALL APPLICATIONS =====
@applications_bp.route('/', methods=['GET'])
def get_applications():
    applications = Application.query.all()
    return jsonify({
        'success': True,
        'count': len(applications),
        'applications': [a.to_dict() for a in applications]
    })

# ===== GET SINGLE APPLICATION =====
@applications_bp.route('/<int:id>', methods=['GET'])
def get_application(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({'error': 'Application not found'}), 404
    return jsonify({
        'success': True,
        'application': application.to_dict()
    })

# ===== CREATE APPLICATION =====
@applications_bp.route('/', methods=['POST'])
def create_application():
    try:
        data = request.get_json()
        print('📥 Received application data:', data)
        
        required = ['full_name', 'phone', 'email', 'profession', 'county', 'hourly_rate']
        for field in required:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Process skills if it's a string (comma separated)
        skills = data.get('skills', '')
        if isinstance(skills, list):
            skills_str = ','.join(skills)
        else:
            skills_str = skills
        
        application = Application(
            full_name=data.get('full_name'),
            phone=data.get('phone'),
            email=data.get('email'),
            profession=data.get('profession'),
            county=data.get('county'),
            skills=skills_str,
            experience=data.get('experience'),
            hourly_rate=float(data.get('hourly_rate', 0)),
            bio=data.get('bio'),
            profile_image=data.get('profile_image'),
            id_document=data.get('id_document'),
            status='pending'
        )
        
        db.session.add(application)
        db.session.commit()
        
        print('✅ Application saved:', application.to_dict())
        
        return jsonify({
            'success': True,
            'message': 'Application submitted successfully',
            'application': application.to_dict()
        }), 201
    except Exception as e:
        print('❌ Error saving application:', str(e))
        return jsonify({'error': str(e)}), 500

# ===== UPDATE APPLICATION STATUS =====
@applications_bp.route('/<int:id>/status', methods=['PATCH'])
def update_application_status(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({'error': 'Application not found'}), 404
    
    data = request.get_json()
    status = data.get('status')
    
    if status not in ['pending', 'approved', 'rejected']:
        return jsonify({'error': 'Invalid status'}), 400
    
    application.status = status
    
    # If approved, create a worker
    if status == 'approved':
        existing_worker = Worker.query.filter_by(name=application.full_name).first()
        
        if not existing_worker:
            worker = Worker(
                name=application.full_name,
                profession=application.profession,
                county=application.county,
                price=application.hourly_rate,
                skills=application.skills,
                experience=application.experience,
                bio=application.bio,
                profile_image=application.profile_image,
                is_verified=True,
                is_available=True,
                status='approved'
            )
            db.session.add(worker)
            print(f'✅ Worker created from application: {worker.name}')
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': f'Application {status} successfully',
        'application': application.to_dict()
    })

# ===== DELETE APPLICATION =====
@applications_bp.route('/<int:id>', methods=['DELETE'])
def delete_application(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({'error': 'Application not found'}), 404
    
    db.session.delete(application)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Application deleted successfully'
    })
