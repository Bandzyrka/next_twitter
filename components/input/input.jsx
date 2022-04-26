import { ChartBarIcon,PhotographIcon, EmojiHappyIcon, GiftIcon, XIcon } from '@heroicons/react/outline'
import React, { useState, useRef } from 'react'

const Input = () => {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickRef = useRef(null)

  return (
    <div className="flex space-x-3 overflow-y-hidden border-b border-[#E1E8ED] p-3">
      <img
        src="https://picsum.photos/id/237/200/300"
        alt="profile"
        className="h-11 w-11 cursor-pointer rounded-full"
      />
      <div className="w-full">
        <div className="">
          <textarea
            value={input}
            rows="1"
            className="min-h-[44px] w-full bg-transparent text-lg tracking-wide text-gray-800 outline-none p-2"
            placeholder="What's on your mind?"
            onChange={(event) => setInput(event.target.value)}
          />
        </div>
        {selectedFile && (
          <div className="relative">
            <div className="top=1 absolute left-1 flex h-8 w-8 cursor-pointer items-center justify-center">
              <XIcon
                className="h-5 text-black"
                onClick={() => setSelectedFile(null)}
              />
            </div>
            <div>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="selected"
                className="max-h-80 rounded-2xl object-contain"
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickRef.current.click()}>
              <PhotographIcon className="h-[28px] text-[#1DA1F2]" />
              <input type="file" hidden onChange={(event) => setSelectedFile(event.target.files[0])} ref={filePickRef} />
            </div>
            <div className="icon">
              <GiftIcon className="h-[28px] text-[#1DA1F2]" />
            </div>
            <div className="icon">
              <ChartBarIcon className="h-[28px] text-[#1DA1F2]" />
            </div>
            <div className="icon">
              <EmojiHappyIcon className="h-[28px] text-[#1DA1F2]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Input
