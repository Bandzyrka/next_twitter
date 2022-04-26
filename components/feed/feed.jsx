import React from 'react'
import { SparklesIcon} from '@heroicons/react/outline'
import Input from '../input/input'
const Feed = () => {
  return (
    <div className="flex-grow border-l border-r border-[#E1E8ED] xl:ml-[382px] sm:ml-[72px]">
        <div className="text-[#14171A] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 mb-3">
            <h2 className="font-bold text-2xl">Home</h2>
            <SparklesIcon className="h-7 text-[#1DA1F2]"/>
        </div>
    <Input />
    </div>
  )
}

export default Feed