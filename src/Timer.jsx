import { useState, useEffect } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(false); // To track whether the stopwatch is running

  // Define a function to increment the counter
  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  // Use useEffect to increment the counter when running is true
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(incrementCounter, 10);
    }

    // Cleanup function to clear the interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, [running]);

  // Format the counter value as HH:MM:SS:SS
  const formattedTime = () => {
    const hours = Math.floor(counter / 360000);
    const minutes = Math.floor((counter % 360000) / 6000);
    const seconds = Math.floor((counter % 6000) / 100);
    const milliseconds = counter % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  // Function to handle the Start/Stop button click
  const toggleStartStop = () => {
    setRunning(!running);
  };

  // Function to handle the Reset button click
  const resetCounter = () => {
    setCounter(0);
    setRunning(false);
  };

  return (
    <div className="bg-black w-screen h-screen flex flex-col-reverse sm:flex-row items-center justify-center">
      <div className="bg-[#6BA368] rounded-lg p-6 w-96 sm:w-auto text-center">
        <h1 className="text-4xl font-semibold mb-4">Stopwatch</h1>
        <div className="bg-[#9CFC97] rounded-lg p-4">
          <p className="text-3xl">{formattedTime()}</p>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className={`text-xl p-2 rounded-full w-16 h-16 ${running ? 'bg-red-500' : 'bg-green-500'}`}
            onClick={toggleStartStop}
          >
            {running ? 'Stop' : 'Start'}
          </button>
          <button
            className="text-xl p-2 rounded-full w-16 h-16 bg-yellow-500"
            onClick={resetCounter}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
