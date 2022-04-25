import React from 'react'
import Image from "next/image"
import SideBarLink from '../sidebar-link/sidebar-link'

import { HashtagIcon,
        BellIcon,
        InboxIcon,
        BookmarkIcon,
        ClipboardListIcon,
        UserIcon,
        DotsCircleHorizontalIcon,
        DotsHorizontalIcon
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
            <Image src="https://i.postimg.cc/vBVcVzZS/Bez-nazwy-1.png" width={30} height={30}/>
        </div>
        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
            <SideBarLink title="Home" Icon={HomeIcon} active/>
            <SideBarLink title="Notifications" Icon={BellIcon}/>
            <SideBarLink title="Explore" Icon={HashtagIcon}/>
            <SideBarLink title="Messages" Icon={InboxIcon}/>
            <SideBarLink title="Bookmarks" Icon={BookmarkIcon}/>
            <SideBarLink title="Lists" Icon={ClipboardListIcon}/>
            <SideBarLink title="Profile" Icon={UserIcon}/>
            <SideBarLink title="More" Icon={DotsCircleHorizontalIcon}/>
        </div>
        <button className="hidden xl:inline ml-auto bg-[#1DA1F2] text-[#E1E8ED] rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:scale-105 transition duration-150 ease-in-out active:scale-100"> Tweet </button>
        <div className="flex space-x-2 justify-center items-center ml-auto mt-auto mb-4 xl:mr-[-3rem]">
            <img src="https://lh3.googleusercontent.com/a-/AOh14Gh9vEBt-jQgy2DU644UKBt-aWnjHnahOqtqieiKLw=s288-p-no" alt="profile" className="h-10 w-10 rounded-full xl:mr-2"/>
            <div className="hidden xl:inline leading-5  text-[#657786]">
                <a href="google.com" className="font-bold">@Bandzyrka</a>
                <p>werstaptor@gmail.com</p>
        </div>
        <DotsHorizontalIcon className="hidden h-5 xl:inline ml-10" />
        </div>    
   </div>
  )
}

export default Sidebar