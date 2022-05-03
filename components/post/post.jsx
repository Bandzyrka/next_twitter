import { ChatIcon, HeartIcon, SaveIcon, ShareIcon, DotsHorizontalIcon} from '@heroicons/react/outline'
import React from 'react'

const Post = ({post, id}) => {
  const {image, tag, text, timestamp, userImg, username} = post
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
      <img
        src={userImg}
        alt="profile"
        className="h-11 w-11 cursor-pointer rounded-full"
      />
      <div className="flex flex-col w-full">
        <div className="flex ml-2 w-full justify-between items-center">
          <div className="flex">
            <h3 className="font-bold">{username}</h3>
            <p className="text-[#657786] ml-2">@{tag}</p>
          </div>
          
          <DotsHorizontalIcon className="h-7 mr-6" />
        </div>
        <div className="ml-2">
          <p>
            {text}
          </p>
        </div>
        <div>
        {
          image && <img src={image} alt="0" className="max-h-80 rounded-2xl object-contain mt-4"/>
        }
        </div>
      </div>
      </div>
      <div className="flex justify-between items-center p-4 ml-8 text-[#657786]">
          <ChatIcon className="h-7"/>
          <ShareIcon className="h-7"/>
          <HeartIcon className="h-7"/>
          <SaveIcon className="h-7"/>
      </div>
    </div>
  )
}

export default Post