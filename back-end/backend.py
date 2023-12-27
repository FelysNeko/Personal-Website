from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)


@app.route('/api/image', methods=['POST'])
def image():
    filename = data['filename'] if (
        request.is_json and 
        'filename' in (data:=request.get_json()) and 
        data['filename'] in os.listdir('image')
    ) else 'firemoth-gold.png'
    
    return send_file(f'image/{filename}'), 200


@app.route('/api/information', methods=['POST'])
def projects():
    action = data['action'] if (
        request.is_json and
        'action' in (data:=request.get_json())
    ) else None
        
    if action in ['links', 'projects', 'more', 'hello']:
        with open(f'data/{action}.json') as file:
            result = json.load(file)
        return jsonify(result), 200
    else:
        return jsonify(''), 400


if __name__ == '__main__' :
    app.run(port=9090)