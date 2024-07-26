import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import TaskLine from './TaskLine';

function TaskList() {


    const [data, setData] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const title_input = React.createRef();
    const text_input = React.createRef();

    useEffect(() => {
        fetch('http://127.0.0.1:5000/tasks/')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    }, []);

    const postNewTask = () => {
        const task_title = title_input.current.value
        const task_description = text_input.current.value
        const request1 = new Request("http://127.0.0.1:5000/tasks/", {
            method: "POST",
            body: JSON.stringify({ title: task_title, description: task_description}),
            headers: {
                "Content-Type": "application/json",
              },
          });
          fetch(request1)
          .then(response => response.json())
          .then(json => {
            setData(json.filter((task_instance) => !task_instance.completed))
            return json
          })
          .then(json => {
            setCompletedTasks(json.filter((task_instance) => task_instance.completed))
          })
          .catch(error => console.error(error));

    }

    const removeTask = (task) => {
        const request = new Request("http://127.0.0.1:5000/tasks/", {
            method: "DELETE",
            body: JSON.stringify({...task}),
            headers: {
                "Content-Type": "application/json",
              },
          });
          fetch(request)
          .then(response => response.json())
          .then(json => {
            setData(json.filter((task_instance) => !task_instance.completed))
            return json
          })
          .then(json => {
            setCompletedTasks(json.filter((task_instance) => task_instance.completed))
          })
          .catch(error => console.error(error));

    }



    const setTaskCompleted = (task) => {
        const request = new Request("http://127.0.0.1:5000/tasks/completed/", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
              },
          });
          fetch(request)
          .then(response => response.json())
          .then(json => {
            setData(json.filter((task_instance) => !task_instance.completed))
            return json
          })
          .then(json => {
            setCompletedTasks(json.filter((task_instance) => task_instance.completed))
          })
          .catch(error => console.error(error));



    }

    const addTask = (
        <tr>

                <td>
                    
                </td>
                <td className="task-title-col">
                        <div className="form-group task-title">
                            <input type="text" className="form-control" id="task_title" ref={title_input} placeholder="Add a new task title"/>
                        </div>
                </td>
                <td className="task-desc-col">

                        <div className="form-group task-description">
                            <input type="text" className="form-control" id="task_description" ref={text_input} placeholder="Add a new task description here"/>
                        </div>
                </td>
                <td>

                        <button type="submit" onClick={postNewTask} className="btn btn-primary">Submit</button>
                </td>
        </tr>)



  return (
    <div className="taskList">
        <h3>Uncompleted Tasks {data.length}</h3>
        <table className='table'>
            <tbody>
                {data.map((task, key) => {
                    return <TaskLine task={task} i={key} removeTask={removeTask} setTaskCompleted={setTaskCompleted}/>;
                })}
                {addTask}
                
            </tbody>
        </table>
        <h3>Completed Tasks {completedTasks.length}</h3>
        <table className='table'>
            <tbody>
                {completedTasks.map((task, key) => {
                        console.log(task.description, task.completed)
                        return <TaskLine task={task} i={key} removeTask={removeTask} setTaskCompleted={setTaskCompleted} />;
                    })} 
            </tbody>
        </table>
    </div>
  );
}

export default TaskList;
