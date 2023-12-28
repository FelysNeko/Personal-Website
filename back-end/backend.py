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
    ) else 'default.png'
    
    return send_file(f'image/{filename}')


@app.route('/api/information', methods=['GET'])
def projects():
    with open('data.json') as file:
        data = json.load(file)

    return jsonify(data)


if __name__ == '__main__' :
    app.run(port=8000)