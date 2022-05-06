import Head from 'next/head'
import Sidebar from '../components/sidebar/sidebar'
import Feed from '../components/feed/feed'
import Login from '../components/login/login'
import Modal from '../components/modal/modal'
import { getProviders, getSession, useSession } from "next-auth/react";
import React from 'react'
import {modalState} from '../atoms/ModalAtom'
import { useRecoilState } from 'recoil';

export default function Home({providers}){
  const { data: session } = useSession();
  if (!session) return <Login providers={providers} />;
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  return (
    <div className={`${isOpen ? 'blur-sm': null}`}>
      <Head>
        <title>Next Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#F5F8FA] flex min-h-screen max-w-[1500px] mx-auto">
        <Sidebar/>
        <Feed />
        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}