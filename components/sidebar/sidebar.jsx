import React, {useState} from 'react'
import Image from 'next/image'
import SideBarLink from '../sidebar-link/sidebar-link'
import { signOut, useSession } from "next-auth/react";

import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
const Sidebar = () => {
  const { data: {user: {name, tag, image}} } = useSession();
  const [options, setOptions] = useState(false)
  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Image
          src="https://i.postimg.cc/vBVcVzZS/Bez-nazwy-1.png"
          width={30}
          height={30}
        />
      </div>
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        <SideBarLink title="Home" Icon={HomeIcon} active />
        <SideBarLink title="Notifications" Icon={BellIcon} />
        <SideBarLink title="Explore" Icon={HashtagIcon} />
        <SideBarLink title="Messages" Icon={InboxIcon} />
        <SideBarLink title="Bookmarks" Icon={BookmarkIcon} />
        <SideBarLink title="Lists" Icon={ClipboardListIcon} />
        <SideBarLink title="Profile" Icon={UserIcon} />
        <SideBarLink title="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="ml-auto hidden h-[52px] w-56 rounded-full bg-[#1DA1F2] text-lg font-bold text-[#E1E8ED] shadow-md transition duration-150 ease-in-out hover:scale-105 active:scale-100 xl:inline">
        {' '}
        Tweet{' '}
      </button>
      <div className="ml-auto mt-auto mb-4 flex items-center justify-center hoverAnimation p-0">
        <img
          src={image}
          alt="profile"
          className="h-10 w-10 rounded-full sm:mr-2 xl:mr-2"
        />
        <div className="hidden leading-5 text-[#657786]  xl:inline">
          <p className="font-bold">
            {name}
          </p>
          <p>
            @{tag}
          </p>
        </div>
        <div>
        <DotsHorizontalIcon onClick={() => setOptions(!options)}className="ml-10 hidden h-5 sm:block sm:absolute sm:right-7 sm:bottom-1 xl:inline xl:static cursor-pointer" />
        {options && <div className="bg-white border-2 w-16 h-14 flex flex-col items-center justify-start absolute bottom-2 xl:left-[340px] sm:left-[80px] swing-in-top-fwd">
        <p onClick={signOut}className="text-red-600 hover:text-black">Logout</p>
        </div>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
