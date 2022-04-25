import Head from 'next/head'
import Sidebar from '../components/sidebar/sidebar'
const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Next Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-[#E1E8ED] flex min-h-screen max-w-[1500px] mx-auto">
        <Sidebar/>
      </main>
      
    
    </div>
  )
}

export default Home
