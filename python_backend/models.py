"""
Lahore Student Stay - SQLAlchemy Relational Models
"""

import json
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Hostel(db.Model):
    __tablename__ = 'hostels'

    id = db.Column(db.String(64), primary_key=True)
    slug = db.Column(db.String(150), unique=True, nullable=False, index=True)
    name = db.Column(db.String(150), nullable=False)
    gender = db.Column(db.String(16), nullable=False, index=True) # 'Boys' or 'Girls'
    area = db.Column(db.String(120), nullable=False, index=True)
    sub_area = db.Column(db.String(150), default='')
    full_address = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, default='')
    monthly_rent_min = db.Column(db.Integer, nullable=False, default=0)
    monthly_rent_max = db.Column(db.Integer, nullable=False, default=0)
    security_deposit = db.Column(db.Integer, nullable=True)
    room_type = db.Column(db.String(64), default='Double')
    _room_options = db.Column('room_options', db.Text, default='[]')
    capacity = db.Column(db.Integer, nullable=True)
    availability_status = db.Column(db.String(32), default='Unknown')
    available_beds = db.Column(db.Integer, nullable=True)

    # Facilities
    furnished = db.Column(db.Boolean, default=False)
    ac = db.Column(db.Boolean, default=False)
    attached_bathroom = db.Column(db.Boolean, default=False)
    wifi = db.Column(db.Boolean, default=False)
    wifi_speed = db.Column(db.String(64), default='Not provided')
    electricity = db.Column(db.String(120), default='Not provided')
    backup = db.Column(db.String(64), default='Not provided')
    mess = db.Column(db.Boolean, default=False)
    mess_frequency = db.Column(db.String(120), default='Not provided')
    laundry = db.Column(db.Boolean, default=False)
    parking = db.Column(db.Boolean, default=False)
    cctv = db.Column(db.Boolean, default=False)
    security_guard = db.Column(db.Boolean, default=False)
    study_room = db.Column(db.Boolean, default=False)
    kitchen = db.Column(db.Boolean, default=False)
    generator = db.Column(db.Boolean, default=False)
    water = db.Column(db.Boolean, default=True)
    geyser = db.Column(db.Boolean, default=False)
    cleaning = db.Column(db.Boolean, default=True)

    # Contact & Location
    contact_name = db.Column(db.String(120), default='')
    phone = db.Column(db.String(32), default='')
    whatsapp = db.Column(db.String(32), default='')
    website = db.Column(db.String(255), default='')
    google_maps_url = db.Column(db.Text, default='')
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)

    # Media & Verification
    _photos = db.Column('photos', db.Text, default='[]')
    verification_status = db.Column(db.String(32), default='Pending Verification', index=True)
    verified_date = db.Column(db.String(32), nullable=True)
    last_checked = db.Column(db.String(32), nullable=False)
    featured = db.Column(db.Boolean, default=False)
    published = db.Column(db.Boolean, default=True, index=True)
    _nearby_universities = db.Column('nearby_universities', db.Text, default='[]')
    source_url = db.Column(db.Text, default='')
    source_name = db.Column(db.String(150), default='Public Directory')
    notes = db.Column(db.Text, default='')

    # Analytics & Future Monetization
    listing_views = db.Column(db.Integer, default=0)
    contact_clicks = db.Column(db.Integer, default=0)
    whatsapp_clicks = db.Column(db.Integer, default=0)
    map_clicks = db.Column(db.Integer, default=0)
    phone_clicks = db.Column(db.Integer, default=0)
    sponsored = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @property
    def room_options(self):
        try:
            return json.loads(self._room_options or '[]')
        except Exception:
            return []

    @room_options.setter
    def room_options(self, val):
        self._room_options = json.dumps(val or [])

    @property
    def photos(self):
        try:
            return json.loads(self._photos or '[]')
        except Exception:
            return []

    @photos.setter
    def photos(self, val):
        self._photos = json.dumps(val or [])

    @property
    def nearby_universities(self):
        try:
            return json.loads(self._nearby_universities or '[]')
        except Exception:
            return []

    @nearby_universities.setter
    def nearby_universities(self, val):
        self._nearby_universities = json.dumps(val or [])

    def to_dict(self):
        return {
            'id': self.id,
            'slug': self.slug,
            'name': self.name,
            'gender': self.gender,
            'area': self.area,
            'sub_area': self.sub_area,
            'full_address': self.full_address,
            'description': self.description,
            'monthly_rent_min': self.monthly_rent_min,
            'monthly_rent_max': self.monthly_rent_max,
            'security_deposit': self.security_deposit,
            'room_type': self.room_type,
            'room_options': self.room_options,
            'capacity': self.capacity,
            'availability_status': self.availability_status,
            'available_beds': self.available_beds,
            'furnished': self.furnished,
            'ac': self.ac,
            'attached_bathroom': self.attached_bathroom,
            'wifi': self.wifi,
            'wifi_speed': self.wifi_speed,
            'electricity': self.electricity,
            'backup': self.backup,
            'mess': self.mess,
            'mess_frequency': self.mess_frequency,
            'laundry': self.laundry,
            'parking': self.parking,
            'cctv': self.cctv,
            'security_guard': self.security_guard,
            'study_room': self.study_room,
            'kitchen': self.kitchen,
            'generator': self.generator,
            'water': self.water,
            'geyser': self.geyser,
            'cleaning': self.cleaning,
            'contact_name': self.contact_name,
            'phone': self.phone,
            'whatsapp': self.whatsapp,
            'website': self.website,
            'google_maps_url': self.google_maps_url,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'photos': self.photos,
            'verification_status': self.verification_status,
            'verified_date': self.verified_date,
            'last_checked': self.last_checked,
            'featured': self.featured,
            'published': self.published,
            'nearby_universities': self.nearby_universities,
            'source_url': self.source_url,
            'source_name': self.source_name,
            'notes': self.notes,
            'listing_views': self.listing_views,
            'contact_clicks': self.contact_clicks,
            'whatsapp_clicks': self.whatsapp_clicks,
            'map_clicks': self.map_clicks,
            'phone_clicks': self.phone_clicks,
        }
