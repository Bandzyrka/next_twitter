import React from 'react'
import { SparklesIcon} from '@heroicons/react/outline'

const Feed = () => {
  return (
    <div className="flex-grow border-l border-r border-gray-800 xl:ml-[382px] sm:ml-[72px]">
        <div className="text-[#F5F8FA] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-[#657786] border-b border-gray-700">
            <h2 className="font-bold text-lg sm:text-xl">Home</h2>
            <SparklesIcon className="h-7"/>
        </div>
    
    </div>
  )
}

export default Feed