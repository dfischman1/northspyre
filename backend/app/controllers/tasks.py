from flask import request, jsonify, Blueprint, current_app
from app import db
from app.models import Task

bp = Blueprint('tasks', __name__, url_prefix='/tasks')

@bp.route('/', methods=['GET'])
def get_tasks():
    current_app.logger.info("Entering get tasks")
    tasks = Task.query.all()
    return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200


@bp.route('/', methods=['POST'])
def add_task():
    try:
        data = request.get_json()
        current_app.logger.info(f"Entering add task with request: {data}")
        title = data.get("title")
        description = data.get("description")
        task = Task(
                title=title,
                description=description
            )
        db.session.add(task)
        db.session.commit()
        tasks = Task.query.all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
    except Exception as e:
        current_app.logger.warn(f"Exception: {e}")
        raise BaseException()
    


@bp.route('/', methods=['DELETE'])
def remove_task():
    try:
        data = request.get_json()
        current_app.logger.info(f"Entering remove task with request: {data}")
        task_id = data.get("id")
        task = Task.query.get_or_404(task_id)

        db.session.delete(task)
        db.session.commit()
        tasks = Task.query.all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
    except Exception as e:
        current_app.logger.warn(f"Exception: {e}")
        raise BaseException()
    

@bp.route('/completed/', methods=['POST'])
def complete_task():
    try:
        data = request.get_json()
        current_app.logger.info(f"Entering complete task with request: {data}")
        task_id = data.get("id")
        task = Task.query.get_or_404(task_id)
        task.completed = data.get("completed")
        db.session.commit()
        tasks = Task.query.all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
    except Exception as e:
        current_app.logger.warn(f"Exception: {e}")
        raise BaseException()
