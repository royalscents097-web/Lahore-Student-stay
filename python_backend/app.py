"""
Lahore Student Stay - Production Flask Application
Run locally: flask run --port 3000
Production: gunicorn python_backend.app:app
"""

import os
import secrets
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory
from dotenv import load_dotenv
from python_backend.models import db, Hostel

load_dotenv()

app = Flask(__name__, static_folder='../dist', static_url_path='/')

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', secrets.token_hex(32))
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///lahore_hostels.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'lahore2026admin')
active_tokens = set()

with app.app_context():
    db.create_all()

@app.route('/health')
def health():
    return jsonify({
        'status': 'ok',
        'service': 'Lahore Student Stay Flask API',
        'database': 'connected',
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/api/hostels')
def get_hostels():
    query = Hostel.query.filter_by(published=True)

    gender = request.args.get('gender')
    if gender and gender != 'All':
        query = query.filter_by(gender=gender)

    area = request.args.get('area')
    if area and area != 'All':
        query = query.filter(Hostel.area.ilike(f"%{area}%"))

    max_rent = request.args.get('maxRent', type=int)
    if max_rent:
        query = query.filter(Hostel.monthly_rent_min <= max_rent)

    verified_only = request.args.get('verifiedOnly')
    if verified_only == 'true':
        query = query.filter_by(verification_status='Verified')

    hostels = query.all()
    return jsonify({
        'success': True,
        'count': len(hostels),
        'data': [h.to_dict() for h in hostels]
    })

@app.route('/api/hostels/<id_or_slug>')
def get_hostel(id_or_slug):
    hostel = Hostel.query.filter(
        (Hostel.id == id_or_slug) | (Hostel.slug == id_or_slug)
    ).first()
    if not hostel:
        return jsonify({'error': 'Hostel not found'}), 404

    hostel.listing_views = (hostel.listing_views or 0) + 1
    db.session.commit()
    return jsonify({'success': True, 'data': hostel.to_dict()})

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json() or {}
    password = data.get('password')
    if not password or password != ADMIN_PASSWORD:
        return jsonify({'error': 'Invalid admin password'}), 401
    
    token = secrets.token_hex(32)
    active_tokens.add(token)
    return jsonify({'success': True, 'token': token})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    if os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    return jsonify({'status': 'Lahore Student Stay Backend Running', 'health_check': '/health'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 3000)), debug=True)
