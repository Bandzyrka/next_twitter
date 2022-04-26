import Head from 'next/head'
import Sidebar from '../components/sidebar/sidebar'
import Feed from '../components/feed/feed'
const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Next Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-[#F5F8FA] flex min-h-screen max-w-[1500px] mx-auto">
        <Sidebar/>
        <Feed />
      </main>
      
    
    </div>
  )
}

export default Home
