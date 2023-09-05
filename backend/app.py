from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from sqlalchemy import DateTime, asc, desc
import os
from sqlalchemy.sql import func


basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Gra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pytanie = db.Column(db.String(100), nullable=False)
    odpowiedz = db.Column(db.String(100), nullable=False)
    kiedy = db.Column(DateTime(timezone=True), server_default=func.now())
    streak = db.Column(db.Integer)
    def __repr__(self):
        return f'{self.pytanie}'

def getFirst():
    najszybsze = Gra.query.order_by(asc(Gra.kiedy)).first()
    if najszybsze is None:
        return('Add new word')
    elif najszybsze.kiedy < datetime.now():
        first_record = najszybsze
    else:
        return('Please wait for your next word')
    return(first_record)

@app.route('/api', methods=['GET'])
def api():
    frecord = getFirst()
    print(frecord)
    response = {
        'pytanie': str(frecord), 
        'odpowiedz': str(frecord.odpowiedz), 
        'kiedy': str(frecord.kiedy), 
        'streak': int(frecord.streak)}
    return jsonify(response)

@app.route('/answer', methods=['POST'])
def answer():
    frecord = getFirst()
    data = request.json
    if data == {'message': 'yes'}:
        frecord.streak += 1
        frecord.kiedy = datetime.now() + timedelta(days=3*int(frecord.streak))
        db.session.commit()
        print('success yes')
    if data == {'message': 'no'}:
        frecord.streak = 0
        frecord.kiedy = datetime.now()
        db.session.commit()
        print('success no')
    return jsonify(data)