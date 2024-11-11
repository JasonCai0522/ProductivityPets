import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import alien1 from "./Images/Alien/alien1.png"
import alien2 from "./Images/Alien/alien2.png"
import alien3 from "./Images/Alien/alien3.png"
import alien1cry from "./Images/Alien/alien1cry.png"
import alien2cry from "./Images/Alien/alien2cry.png"
import alien3cry from "./Images/Alien/alien3cry.png"

import frog1 from "./Images/Frog/frog1.png"
import frog2 from "./Images/Frog/frog2.png"
import frog3 from "./Images/Frog/frog3.png"
import frog1cry from "./Images/Frog/frog1Cry.png"
import frog2cry from "./Images/Frog/frog2cry.png"
import frog3cry from "./Images/Frog/frog3Cry.png"

import penguin1 from "./Images/Penguin/peng1.png"
import penguin2 from "./Images/Penguin/peng2.png"
import penguin3 from "./Images/Penguin/peng3.png"
import penguin1cry from "./Images/Penguin/penguin1cry.png"
import penguin2cry from "./Images/Penguin/penguin2cry.png"
import penguin3cry from "./Images/Penguin/penguin3cry.png"

import egg from "./Images/Egg/egg.png"
import eggCry from "./Images/Egg/eggCry.png"

import tombstone from "./Images/tombstone.png"

const animals = [[egg, penguin1, penguin2, penguin3],
                 [egg, frog1, frog2, frog3],
                 [egg, alien1, alien2, alien3]]

const timerState = {
  notstarted : "NOT STARTED",
  paused: 'PAUSED',
  running: 'RUNNING'
}

const workState = {
  work: 'WORK',
  rest: 'REST' 
}



function App() {
  const [gameState, setGameState] = useState(timerState.notstarted);
  const [work, setWork] = useState(workState.work);
  const [timerAmount, setTimerAmount] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [count, setCount] = useState(0);

  const [websiteState, setWebsiteState] = useState("select");

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);




  const toggleButton = () => {
    if (gameState === timerState.paused || gameState === timerState.notstarted) {
      setGameState(timerState.running);
    } else if (gameState === timerState.running){
      setGameState(timerState.paused)
    }

    if (isActive) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }

  const cancelButton = () => {
    setGameState(timerState.notstarted);
    setIsActive(true);
    setWebsiteState("Failure")
  }
  
  useEffect(() => {
    let interval;

    const getTime = () => {
      if (gameState === timerState.running) {
        const time = timerAmount - 1;
      setTimerAmount(time);
      }
      setMinutes(Math.floor((timerAmount / 60) % 60));
      setSeconds(Math.floor(timerAmount % 60));
    };

    // Change the timerAmount based off if its a work session or rest session
    if (count === 3) {
      setWebsiteState("Finish")
    }

    
    if (gameState === timerState.notstarted) {
       if (work === workState.work) {
        setTimerAmount(1500)
       } else if (work === workState.rest) {
        setTimerAmount(300)
       }
       setIsActive(true)

       // Start updating the timer
       interval = setInterval(() => getTime(timerAmount), 1000);
    } //else if (gameState === timerState.paused){
      // Stop the timer, 
    
      else if (gameState === timerState.running) {
      // Start updating the timer, without changing the timerAmount
      interval = setInterval(() => getTime(timerAmount), 1000);
      // Check if timerAmount is equal to zero
      if (timerAmount === 0) {
        if (work === workState.work) {
          setWork(workState.rest);
          setCount(count + 1)
         } else if (work === workState.rest) {
          setWork(workState.work);
         }
         setGameState(timerState.notstarted)
      }
    }
    
    return () => clearInterval(interval);

  }, [gameState, timerAmount, work, count])

  const handleClick = (event) => {
    if (event.target.className === "frog") {
      setWebsiteState(1)
    } else if (event.target.className === "alien") {
      setWebsiteState(2)
    } else if (event.target.className === "penguin") {
      setWebsiteState(0)
    }
  };


if (websiteState === "select") {
  return (
    <div>
      <div class="rectangle">
        <h1 style = {{ textAlign: 'center' }}>Select your Pal!</h1>
      </div>
      <div className = "startContainer">
        <button onClick={handleClick} className="frog">
        Select Frog
        </button>
        <button onClick={handleClick} className="alien">
        Select Alien
        </button>
        <button onClick={handleClick} className="penguin">
        Select Penguin
        </button>
      </div>
    </div>
  ) 
} else if (websiteState === "Finish") {
  return (
	<div className="rectangler">
	   <h1 style = {{ textAlign: 'center' }}>Congratulations on Completing Your Task!</h1>
  </div>
  ) 
} else if (websiteState === "Failure") {
  return (
    <div>
      <img className="tombstone" src= {tombstone} alt= "tombstone"/>
    <div className="death-message">
       <h1 style = {{ textAlign: 'center' }}>YOUR PET DIED AND ITS YOUR FAULT!</h1>
    </div>
    </div>
    )
} else {
  return (
    <div>
      <div className="rectangle">
        <h1 style = {{ textAlign: 'center' }}>My Productivity Pal</h1>
      </div>
    
      <div>
        <img className="pet-image" src={animals[websiteState][count]} alt= "Picture of an animal"/>
      </div>

    <h2 className = {(work === workState.work) ? 'work' : 'rest'}> {(work === workState.work) ? "Work period has started" : "Rest period has started"}</h2>
    <h2 className = "timer">00 : {minutes} : {seconds} </h2>
    

      <div className = "container">    
        <button
        onClick={toggleButton}
        className={isActive ? 'startButton' : "pauseButton"}
        >{isActive ? 'Start Hatching Process' : 'Pause Hatching Process'}
        </button>
       
        <button
        onClick = {cancelButton}
        className='cancelButton'
        >Cancel Hatching Process?
        </button>

      </div>
    </div>  

  );
}}

export default App;
