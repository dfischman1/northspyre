import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/taskLine.css';
import React, { useState } from 'react';

function TaskLine({task, i, removeTask, setTaskCompleted}) {


  const manageCompletion = (task) => {
    task.completed = !task.completed
    setTaskCompleted(task)
  }

  return (
    <tr key={i}>
        <td className="completed-check">
            <input className="form-check-input form-check" type="checkbox" checked={task.completed} id="flexCheckDefault" onChange={() => manageCompletion(task)} />
        </td>
        <td className="task-title-col">
            <label className="form-check-label form-check task-title">
                {task.title}
            </label>
        </td>
        <td className="task-desc-col">
            <label className="form-check-label form-check task-description">
                {task.description}
            </label>
        </td>
        <td>
            <i className="bi bi-x-lg" onClick={() => removeTask(task) }></i>
        </td>
    </tr>
  );
}

export default TaskLine;
