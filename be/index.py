from flask import Flask, jsonify, request
from routers.EmotionDetect import EmotionDetect, Feedback
from flask_cors import CORS
from lib.utils import create_emotionclf_table
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
create_emotionclf_table()

@app.route('/detect', methods=['POST'])
def emotionDetect():
    req = request.get_json()
    res = EmotionDetect(data=req)
    return jsonify(res)

@app.route('/feedback', methods=['POST'])
def upFeedback():
    req = request.get_json()
    res = Feedback(data=req)
    return jsonify(res)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0',port=8000)