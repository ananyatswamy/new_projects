import './App.css';
import { useState } from 'react';
import Popup from './Popup';
import woop from './woop.png';

function App() {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [names, setElements] = useState([]);
  const [dates, setDates] = useState([]);
  const [sortedIndexs, setSortIndex] = useState([]);
  const [minDate, setMinDate] = useState(new Date());
  const [points, setPoints] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [randTaskInd, setRandTask] = useState(0);
  const [randTaskPoints, setRandPoints] = useState(0);
  const handlePickTask = () => {
    points.length = dates.length;
    sortedIndexs.length = dates.length;
    sortDates();
    givePoints();
    setRandTask(getRandTask());
    setButtonPopup(true);

  }
  const handleAddTask = () =>{
    addElement();
    addDate();
  };
  const handleUpdateName = (event) =>{
    setTaskName(event.target.value);
    
  };
  const handleUpdateDate = (event) =>{
    setDueDate(new Date(event.target.value));
  };
  const addElement = () => {
    setElements([...names, taskName]);
  };
  const addDate = () => {
    setDates([...dates, dueDate]);
  };

  const sortDates = () => {
    sortedIndexs.length = dates.length;
    for(let j = 0; j < dates.length; j++){
      setMinDate(dates[j]);
      for(let i = j+1; i < dates.length; i++){

      if(dates[i] < minDate){
        setMinDate(dates[i]);
        sortedIndexs[j] = i;
        console.log(sortedIndexs[j]);
      }
     }

    }
    
  };

  const givePoints = () =>{
    var pointVal = 100;
    var sumPoints = 100;
    setPoints([dates.length]);
    points[0] = 100;

    for(let i = 1; i < sortedIndexs.length; i++){
      console.log(sortedIndexs[i]);
      if(dates[sortedIndexs[i]] === dates[sortedIndexs[i-1]]){
        points[i] = pointVal;
        sumPoints += pointVal;
      }
      else{
        if(pointVal <= 0){
          pointVal = 10;
        }
        else{
          pointVal -= 10;
        }
        console.log(pointVal);
        points[i] = pointVal;
        sumPoints += pointVal;
      }
    for(let i = 0; i < sortedIndexs.length; i++){
      points[i] = (points[i]/sumPoints)*100;
      console.log(points[i]);
      }
    }
  };

  const getRandTask = () => {
    var rand = Math.random()*100;
    console.log(rand);
    var taskInd = sortedIndexs[0];
    var pointInd = 0;
    console.log(sortedIndexs[1]);
    for(let i = 0; i<points.length; i++){
      console.log(points[i]);
      if(points[i] <= rand){
        console.log(sortedIndexs[i]);
        taskInd = sortedIndexs[i];
        pointInd = i;
      }
    }
    console.log(taskInd);
    setRandPoints(points[pointInd]);
    console.log(names[taskInd]);
    return taskInd;

  };



  return (
    
      <main>
        <header>
          <h1>The Indecisive To-Do List</h1>
        </header>
        <div className = "todolist">
          <input type = "text" placeholder = "Add a task." onChange = {handleUpdateName} value = {taskName}/>
          <input type = "date" onChange = {handleUpdateDate}/>
          <button onClick = {handleAddTask}>Add task</button>
        </div>
        <button onClick = {handlePickTask} className = "pickButton">Tell me what to do!</button>
        <h2>Your tasks:</h2>
        <div style={{ marginTop: '10px' }}>
          {names.map((element, index) => (
            <div key={index} style={{ margin: '5px', padding: '10px', backgroundColor: 'lightblue', border: '1px solid blue' }}>
              {element}{" Due Date: "} {dates[index].getMonth()+1}{ "/" } {dates[index].getDate()+1}
            </div> 
          ))}
        
        </div>
      
      <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
        <h3>Your task</h3>
        <img src = {woop} className='spinner' alt = 'spinner wheel'/>
        <h4>We spun a wheel!</h4>
        <p>Here is your task, should you choose to accept it:</p>
        <p>{names[randTaskInd]}</p>
        <p>There was a {randTaskPoints} percent chance of getting it!</p>
      </Popup>

      </main>
      
      
  );
}

export default App;
