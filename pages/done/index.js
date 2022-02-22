import Link from 'next/link';

function DonePage() {
  return (
    <div className="container mx-auto">
      <div className="text-center my-10">
        <h1 className="text-4xl"> Email Sent! </h1>
        <h3 className="text-m"> 
          You should recieve it in your inbox shortly.
          <br />
          If you don't, check your spam folder.
        </h3>
      </div>
      <div className="flex justify-center">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-4 rounded"> Home </button>
        </Link>
      </div>
    </div>
  );
}

export default DonePage;
