import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Title from './components/Title';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Title/>
      <TaskList/>
    </div>
  );
}

export default App;
