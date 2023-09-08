import React from 'react'
import { useState, useEffect } from 'react';


const Hero = () => {
  const [data, setData] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false)
  const [answerButton, setAnswerButton] = useState(true)
  const [dataButtons, setDataButtons] = useState(false)
  

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:5000/api');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };
  const sendData = async (value) => {
    try {
      const response = await fetch('https://localhost:5000/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: value }),
      });
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
  
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }
  const handleButtonClick = async (wynik) => {
    try {
      await sendData(wynik);
      setShowAnswer(false);
      setDataButtons(false);
      setAnswerButton(true);
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonAnswer = () => {
    setShowAnswer(true)
    setAnswerButton(false)
    setDataButtons(true)
  };

  useEffect(()=>{
    fetchData()
  }, []);
  
  return (
    <section>
      {data &&
        <div>
          <div className="m-10 rounded-lg bg-slate-500 px-6 py-8 shadow-xl ring-1 ringslate-900">
            <p className="text-center font-mono">{data.pytanie}</p>
          </div>
          {showAnswer &&
            <div>
              <div className="m-10 rounded-lg bg-slate-500 px-6 py-8 shadow-xl ring-1 ringslate-900">
                <p className="text-center font-mono">{data.odpowiedz}</p>
              </div>
            </div>
          }
          {dataButtons &&
          <div className='p-10 flex justify-center'>
            <button className='buttonA' onClick={() => handleButtonClick('yes')}>Yes</button>
            <button className='buttonA' onClick={() => handleButtonClick('no')}>No</button>
          </div>
          }
          {answerButton &&
          <div className='flex justify-center'>
            <button className='buttonA' onClick={handleButtonAnswer}>Answer</button>
          </div>
          }
        </div>}
        <div>
          <div className='flex justify-center p-10'>
            <a href="/database">
              <button className='buttonA'>
                All Words
              </button>
            </a>
          </div>
        </div>
    </section>
  )
  }
export default Hero