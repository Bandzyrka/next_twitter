import React from 'react'
import Image from 'next/image'
import SideBarLink from '../sidebar-link/sidebar-link'

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
      <div className="ml-auto mt-auto mb-4 flex items-center justify-center space-x-2 xl:mr-[-2rem]">
        <img
          src="https://picsum.photos/id/237/200/300"
          alt="profile"
          className="h-10 w-10 rounded-full sm:mr-2 xl:mr-2"
        />
        <div className="hidden leading-5 text-[#657786]  xl:inline">
          <a href="google.com" className="font-bold">
            @Bandzyrka
          </a>
          <p>werstaptor@gmail.com</p>
        </div>
        <DotsHorizontalIcon className="ml-10 hidden h-5 xl:inline" />
      </div>
    </div>
  )
}

export default Sidebar
