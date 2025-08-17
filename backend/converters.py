"""
converters.py
Handles conversion between frontend JSON and backend-friendly dicts
"""

def json_to_dicts(payload):
    """
    Convert frontend JSON into Python dicts for the scheduler.
    Expected payload structure:
    {
      "generalInfo": {...},
      "batchesInfo": [...],
      "coursesInfo": [...]
    }
    """
    general = payload["generalInfo"]
    batches_info = payload["batchesInfo"]
    courses_info = payload["coursesInfo"]

    # --- Batches dict ---
    batches = {
        b["batchName"]: {
            "size": int(b["batchSize"]),
            "courses": b["courses"]
        }
        for b in batches_info
    }

    # --- Teachers dict ---
    teachers = {c["courseName"]: c["teacher"] for c in courses_info}

    # --- Duration dict (hours per session) ---
    duration = {c["courseName"]: int(c["hours"]) for c in courses_info}

    # --- Sessions/week dict ---
    sessions_per_week = {c["courseName"]: int(c["sessions"]) for c in courses_info}

    # --- General values ---
    num_rooms = int(general["totalRooms"])
    max_classes = int(general["maxClassesPerDay"])

    return batches, teachers, duration, sessions_per_week, num_rooms, max_classes


def dicts_to_json(schedule):
    """
    Convert scheduler output (list of dicts) into a structured JSON
    grouped by batch and day → easier for frontend rendering.
    
    Scheduler output example (flat list):
    [
      {"batch": "A", "course": "C1", "teacher": "T1", "room": "R1", "day": "Mon", "period": 1},
      {"batch": "A", "course": "C2", "teacher": "T2", "room": "R2", "day": "Tue", "period": 3},
      ...
    ]

    Returns JSON like:
    {
      "A": {
        "Mon": {1: {...}, 2: null, ...},
        "Tue": {...},
        ...
      },
      "B": {...}
    }
    """
    result = {}

    for entry in schedule:
        batch = entry["batch"]
        day = entry["day"]
        period = entry["period"]

        if batch not in result:
            result[batch] = {}
        if day not in result[batch]:
            result[batch][day] = {}

        result[batch][day][period] = {
            "course": entry["course"],
            "teacher": entry["teacher"],
            "room": entry["room"]
        }

    return result
