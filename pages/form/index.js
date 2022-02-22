import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Form() {
  const [store, setStore] = useState([])
  const [startTime, setStartTime] = useState('')
  const [currentFloor, setCurrentFloor] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const roomStartingData = [{
      "name": "Other",
      "The Great Room": 0,
      "Games Room": 0,
      "Laundry Room": 0
    }];

    for (let i = 4; i <= 10; i++) {
      roomStartingData.push({
        "name": `Floor ${i}`,
        "West Kitchen": 0,
        "East Kitchen": 0,
        "West Study": 0,
        "East Study": 0
      });
    }

    setStore(roomStartingData);
    setStartTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    setUserEmail(localStorage.getItem('userEmail'));
  }, []);

  const handleBeforeFloor = () => {
    if (currentFloor > 0) {
      setCurrentFloor(currentFloor - 1);
    }
  }

  const handleAfterFloor = () => {
    if (currentFloor < store.length - 1) {
      setCurrentFloor(currentFloor + 1);
    }
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value ? parseInt(e.target.value) : 0;
    const target = e.target.name;
    const newStore = [...store];
    newStore[currentFloor][target] = newValue;
    e.target.value = newValue;
    setStore(newStore);
  }

  const handleSubmit = async () => {
    if (userEmail === '') {
      alert('Error: email was not found, please try again or contact Victor');
      return;
    }

    //const root = "http://localhost:8080";
    try {
      const res = await fetch("/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: userEmail,
            data: {
              store: store,
              startTime: startTime,
              endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          })
        }
      );
      router.push('/done');
    } catch (err) {
      alert("An error occured when trying to send the email. Please contact Victor.\n" + err);
      console.log(err);
    }
  }

  const roomForms = (() => {
    const currFloorData = store[currentFloor];
    
    if (!currFloorData) {
      return (<div> Loading... </div>);
    }

    return (
      <>
        <h1 className="text-3xl text-center my-4"> {currFloorData["name"]} </h1>

        <form className="h-[60vh] flex flex-col items-center"> 
        {
          (Object.keys(currFloorData).map((room, index) => {
            
            if (room === "name") {
              return null;
            }

            return (
              <div key={index} className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-white-700 text-m font-bold mb-2"> {room} </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" name={room} onChange={handleInputChange} value={currFloorData[room]} />
              </div>
            );
          }))
        } 
        </form>
      </>
    );
  })();

  return (
    <div> 
      {roomForms}

      <h3 className="text-center text-lg mb-5 mt-10"> Started at: {startTime} </h3>

      <div className="flex justify-around my-5">
          <button onClick={handleBeforeFloor} className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-1 " + (currentFloor > 0 ? "" : "invisible")}> Prev </button>

        <button onClick={handleSubmit} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-1"> Submit </button>

          <button onClick={handleAfterFloor} className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-1 " + (currentFloor < store.length - 1 ? "" : "invisible")} > Next </button>
      </div>
    </div>
  );
}

export default Form;
