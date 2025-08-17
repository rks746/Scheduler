DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]

def generate_timetable(batches, teachers, duration, sessions_per_week, num_rooms, max_classes_per_day):
    """
    Greedy timetable generator.
    Takes dicts from converters.json_to_dicts and produces a list of scheduled classes.
    """

    rooms = [f"R{i+1}" for i in range(num_rooms)]
    periods_per_day = max_classes_per_day

    batch_busy = {batch: set() for batch in batches}
    teacher_busy = {t: set() for t in teachers.values()}
    room_busy = {r: set() for r in rooms}
    schedule = []

    sessions_left = {
        batch: {course: sessions_per_week[course] for course in data["courses"]}
        for batch, data in batches.items()
    }

    def count_classes_in_day(batch, day):
        return sum(1 for d, _ in batch_busy[batch] if d == day)

    def place_class(batch, course, allowed_days=None):
        prof = teachers[course]
        dur = duration[course]
        possible_days = allowed_days if allowed_days else DAYS

        day_load = {day: count_classes_in_day(batch, day) for day in DAYS}
        sorted_days = sorted(possible_days, key=lambda d: day_load[d])

        for day in sorted_days:
            if count_classes_in_day(batch, day) >= periods_per_day:
                continue
            for period in range(1, periods_per_day + 2 - dur):
                needed_slots = [(day, period + i) for i in range(dur)]
                for room in rooms:
                    if (all(slot not in batch_busy[batch] for slot in needed_slots) and
                        all(slot not in teacher_busy[prof] for slot in needed_slots) and
                        all(slot not in room_busy[room] for slot in needed_slots)):

                        for slot in needed_slots:
                            batch_busy[batch].add(slot)
                            teacher_busy[prof].add(slot)
                            room_busy[room].add(slot)
                            schedule.append({
                                "batch": batch,
                                "course": course,
                                "teacher": prof,
                                "room": room,
                                "day": slot[0],
                                "period": slot[1]
                            })
                        sessions_left[batch][course] -= 1
                        return True
        return False

    # Step 1: Guarantee 1 class/day per batch
    for batch, data in batches.items():
        course_index = 0
        for day in DAYS:
            placed, attempts = False, 0
            courses = data["courses"]
            while not placed and attempts < len(courses):
                course = courses[course_index % len(courses)]
                if sessions_left[batch][course] > 0:
                    if place_class(batch, course, allowed_days=[day]):
                        placed = True
                course_index += 1
                attempts += 1

    # Step 2: Fill remaining sessions
    for batch, data in batches.items():
        for course in data["courses"]:
            while sessions_left[batch][course] > 0:
                if not place_class(batch, course):
                    break

    return sorted(
        schedule, key=lambda x: (DAYS.index(x["day"]), x["period"], x["batch"])
    )
