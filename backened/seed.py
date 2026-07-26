from app import create_app
from app.models import db, Worker

app = create_app()

with app.app_context():
    # Clear existing data
    db.session.query(Worker).delete()
    
    # ===== ALL 20 WORKERS =====
    workers_data = [
        {'name': 'Ahmed Hassan', 'profession': 'Electrician', 'county': 'Garissa', 'price': 1500, 'skills': 'Wiring,Repair,Installation,Inspection', 'experience': '5 years', 'is_verified': True, 'is_available': True, 'response_time': '15 min'},
        {'name': 'Jane Wanjiru', 'profession': 'Plumber', 'county': 'Nairobi', 'price': 1200, 'skills': 'Pipe Repair,Leak Detection,Installation', 'experience': '4 years', 'is_verified': True, 'is_available': True, 'response_time': '10 min'},
        {'name': 'John Otieno', 'profession': 'Mechanic', 'county': 'Kisumu', 'price': 2000, 'skills': 'Engine Repair,Brake Service,Diagnostics', 'experience': '7 years', 'is_verified': True, 'is_available': True, 'response_time': '30 min'},
        {'name': 'Mary Akinyi', 'profession': 'Tutor', 'county': 'Mombasa', 'price': 800, 'skills': 'Mathematics,English,Science', 'experience': '3 years', 'is_verified': True, 'is_available': True, 'response_time': '5 min'},
        {'name': 'Peter Kamau', 'profession': 'Cleaner', 'county': 'Nakuru', 'price': 600, 'skills': 'Home Cleaning,Office Cleaning,Carpet Cleaning', 'experience': '3 years', 'is_verified': True, 'is_available': True, 'response_time': '20 min'},
        {'name': 'Sarah Muthoni', 'profession': 'Tailor', 'county': 'Kiambu', 'price': 1000, 'skills': 'Custom Clothing,Alterations,Bridal Wear', 'experience': '6 years', 'is_verified': True, 'is_available': True, 'response_time': '25 min'},
        {'name': 'David Ochieng', 'profession': 'Carpenter', 'county': 'Kisii', 'price': 1800, 'skills': 'Furniture Making,Repairs,Cabinet Installation', 'experience': '8 years', 'is_verified': True, 'is_available': True, 'response_time': '45 min'},
        {'name': 'Grace Wanjiru', 'profession': 'Painter', 'county': 'Nyeri', 'price': 900, 'skills': 'Interior Painting,Exterior Painting,Wallpaper', 'experience': '2 years', 'is_verified': True, 'is_available': True, 'response_time': '30 min'},
        {'name': 'Michael Kariuki', 'profession': 'Driver', 'county': 'Eldoret', 'price': 2500, 'skills': 'Transport,Delivery,Logistics', 'experience': '10 years', 'is_verified': True, 'is_available': True, 'response_time': '15 min'},
        {'name': 'Esther Njoki', 'profession': 'IT Support', 'county': 'Thika', 'price': 1500, 'skills': 'Computer Repair,Network Setup,Software Installation', 'experience': '5 years', 'is_verified': True, 'is_available': True, 'response_time': '10 min'},
        {'name': 'Hassan Omar', 'profession': 'Electrician', 'county': 'Malindi', 'price': 1400, 'skills': 'Wiring,Solar Installation,Repair', 'experience': '4 years', 'is_verified': True, 'is_available': True, 'response_time': '20 min'},
        {'name': 'Faith Akoth', 'profession': 'Plumber', 'county': 'Homa Bay', 'price': 1100, 'skills': 'Pipe Repair,Leak Detection,Installation', 'experience': '2 years', 'is_verified': True, 'is_available': True, 'response_time': '35 min'},
        {'name': 'James Mwangi', 'profession': 'Mechanic', 'county': 'Kajiado', 'price': 2200, 'skills': 'Transmission,Brake Service,Engine Repair', 'experience': '9 years', 'is_verified': True, 'is_available': True, 'response_time': '40 min'},
        {'name': 'Martha Nyambura', 'profession': 'Cleaner', 'county': 'Thika', 'price': 700, 'skills': 'Deep Cleaning,Window Cleaning,Office Cleaning', 'experience': '4 years', 'is_verified': True, 'is_available': True, 'response_time': '15 min'},
        {'name': 'Charles Omondi', 'profession': 'Carpenter', 'county': 'Siaya', 'price': 1600, 'skills': 'Furniture Design,Woodworking,Repairs', 'experience': '7 years', 'is_verified': True, 'is_available': True, 'response_time': '30 min'},
        {'name': 'Priscilla Wangui', 'profession': 'Tutor', 'county': 'Nairobi', 'price': 1000, 'skills': 'English,Literature,Creative Writing', 'experience': '3 years', 'is_verified': True, 'is_available': True, 'response_time': '10 min'},
        {'name': 'Samuel Kiprop', 'profession': 'Electrician', 'county': 'Eldoret', 'price': 1300, 'skills': 'Wiring,Installation,Repair', 'experience': '3 years', 'is_verified': True, 'is_available': True, 'response_time': '25 min'},
        {'name': 'Ruth Kwamboka', 'profession': 'Tailor', 'county': 'Kisii', 'price': 900, 'skills': 'Custom Clothing,Embroidery,Alterations', 'experience': '5 years', 'is_verified': True, 'is_available': True, 'response_time': '20 min'},
        {'name': 'Joseph Njoroge', 'profession': 'Painter', 'county': 'Nakuru', 'price': 800, 'skills': 'Interior Painting,Exterior Painting', 'experience': '2 years', 'is_verified': True, 'is_available': True, 'response_time': '40 min'},
        {'name': 'Aisha Mohamed', 'profession': 'IT Support', 'county': 'Mombasa', 'price': 1600, 'skills': 'Network Security,Software Setup,Computer Repair', 'experience': '6 years', 'is_verified': True, 'is_available': True, 'response_time': '15 min'},
    ]
    
    for data in workers_data:
        worker = Worker(**data)
        db.session.add(worker)
    
    db.session.commit()
    print('✅ All 20 workers added successfully!')
