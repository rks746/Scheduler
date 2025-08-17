from flask import Flask, request, jsonify
from flask_cors import CORS
from converters import json_to_dicts
from scheduler import generate_timetable

app = Flask(__name__)
CORS(app)

@app.route("/generate-timetable", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        batches, teachers, duration, sessions_per_week, num_rooms, max_classes = json_to_dicts(data)
        timetable = generate_timetable(batches, teachers, duration, sessions_per_week, num_rooms, max_classes)
        return jsonify({"timetable": timetable})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
