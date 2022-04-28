import React from 'react'
import { signIn } from "next-auth/react";

import { SearchIcon, UserGroupIcon, ChatIcon } from '@heroicons/react/solid'
const Login = ({providers}) => {
  return (
    <div className="w-screen h-screen flex">
        <div className="flex-1 h-full flex items-center justify-center bg-left bg-[url('http://1000logos.net/wp-content/uploads/2017/06/Twitter-Logo.png')] bg-no-repeat bg-[#25aafc]">
            <div className="flex flex-col">
                <div className="m-4 flex items-center">
                    <SearchIcon className="text-white inline-block h-12"/> <p className="inline-block font-bold text-white mx-[1em] text-2xl">Follow your intrests</p>
                </div>
                <div className="m-4 flex items-center">
                    <UserGroupIcon className="text-white inline-block h-12"/> <p className="inline-block font-bold text-white mx-[1em] text-2xl">Hear what people are talking about</p>
                </div>
                <div className="m-4 flex items-center">
                    <ChatIcon className="text-white inline-block h-12"/> <p className="inline-block font-bold text-white mx-[1em] text-2xl">Join the conversation.

                    </p>
                </div>
            </div>
        </div>
        <div className="flex-1 h-full flex-col items-center justify-center bg-white">

        <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}
            <button
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>

        </div>
    </div>
  )
}

export default Login