import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Email() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setEmail(email);
    }
  }, []);

  const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleButtonClick = () => {
    if (email.length > 0 && validateEmail(email)) {
      localStorage.setItem('userEmail', email);
      router.push('/form');
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center my-4">Enter Email</h1>
      <form className="h-[60vh] flex flex-col items-center" onSubmit={e => e.preventDefault()}> 
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block tracking-wide text-white-700 text-m font-bold mb-2"> Email </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" onChange={e => setEmail(e.target.value)} value={email} />
        </div>
      </form>

      <div className="flex justify-center">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-1" onClick={handleButtonClick}> Select </button>
      </div>
    </>
  );
}

export default Email;
