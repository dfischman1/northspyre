import 'bootstrap/dist/css/bootstrap.min.css';

function AddTask(title_input, text_input, postNewTask) {
  return (
    <tr>
                        <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="task_title" ref={title_input} placeholder="Add a new task title"/>
                                </div>
                        </td>
                        <td>

                                <div className="form-group">
                                    <input type="text" className="form-control" id="task_description" ref={text_input} placeholder="Add a new task description here"/>
                                </div>
                        </td>
                        <td>

                                <button type="submit" onClick={postNewTask} className="btn btn-primary">Submit</button>
                        </td>
                </tr>
  );
}

export default AddTask;
