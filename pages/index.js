import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Cover</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-5xl text-center mt-10"> Cover </h1>
        <h2 className="text-xl text-center my-3"> Your Personal Coverage Assistant </h2>

        <p className="px-5 text-center">
          This is a tool to help you keep track of your coverage data. 
          <br/>
          <br/> 
          Made by me :)
        </p>

        <div className="flex justify-center py-10">
          <Link href="/email">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Start
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
