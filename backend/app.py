from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from sqlalchemy import DateTime, asc, desc
import os
from sqlalchemy.sql import func
import json

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
    response_headers = {
        'Access-Control-Allow-Origin': '*',  # Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  # Allowed HTTP methods
        'Access-Control-Allow-Headers': 'Content-Type',  # Allowed request headers
    }
    response = {
        'id': int(frecord.id),
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

@app.route('/all', methods=['GET'])
def all():
    all_records = Gra.query.order_by(asc(Gra.id)).all()
    records_list = []

    for record in all_records:
        record_dict = {
            'id': record.id,
            'pytanie': record.pytanie,
            'odpowiedz': record.odpowiedz,
            'kiedy': record.kiedy.strftime('%Y-%m-%d %H:%M:%S'),  # Format the datetime
            'streak': record.streak
        }
        records_list.append(record_dict)

    return jsonify(records_list)

@app.route('/edit', methods=['POST'])
def edit():
    editeddata = request.json
    json_string = str(editeddata).replace("'", "\"")
    finaldata = json.loads(json_string)
    id_value = finaldata['id']
    pytanie_value = finaldata['pytanie']
    odpowiedz_value = finaldata['odpowiedz']
    rekord = Gra.query.get_or_404(id_value)
    rekord.pytanie = pytanie_value
    rekord.odpowiedz = odpowiedz_value
    db.session.commit()
    return('Edited')

@app.route('/add', methods=['POST'])
def add():
    newdata = request.json
    json_string = str(newdata).replace("'", "\"")
    finalnewdata = json.loads(json_string)
    newpytanie_value = finalnewdata['pytanie']
    newodpowiedz_value = finalnewdata['odpowiedz']
    aktczas = func.now()
    newrekord = Gra(pytanie=newpytanie_value,odpowiedz=newodpowiedz_value, kiedy=aktczas, streak=0)
    db.session.add(newrekord)
    db.session.commit()
    return('Added')

@app.route('/delete', methods=['POST'])
def delete():
    getID = request.json
    strrjson = str(getID).replace("'", "\"")
    getIDdata = json.loads(strrjson)
    finalID = getIDdata['id']
    todelete = Gra.query.get_or_404(finalID)
    db.session.delete(todelete)
    db.session.commit()
    return('Deleted')

if __name__ == '__main__':
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 5000))
    app.run(host=host, port=port)
