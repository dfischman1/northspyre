from flask import Flask, g
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import logging

db = SQLAlchemy()

logging.basicConfig(level=logging.DEBUG)

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    CORS(app)
    db.init_app(app)
    app.logger.info("starting up")

    with app.app_context():
        g.logger = app.logger
        from .models import Task
        db.create_all()

    @app.route('/', methods=['GET'])
    def hello():
        return "OK"
    from .controllers import tasks
    app.register_blueprint(tasks.bp)

    return app