import React, {useState, useEffect} from 'react'
import Trending from '../trends/trends'
import Image from "next/image";


const Widgets = ({news: {articles}, followResults}) => {
  return (
    <div className="hidden h-full flex-col items-center p-2 md:w-[640px] md:flex xl:items-start">
        <input 
            type="text" 
            className="bg-[#F5F8FA] h-10 shadow-lg rounded-2xl  w-11/12 p-4" 
            placeholder="&#128270; Search Twitter"
        />
        <div className="bg-[#F5F8FA] shadow-lg h-auto p-4 mt-4 rounded-xl w-11/12">
            <h1 className="font-bold text-lg text-[#14171A] mb-4">What's happening?</h1>
            {articles.map(article =>(
                <div key={article.title} className="flex w-full p-2 sm:flex-col xl:flex-row">
                    <div className="flex flex-col">
                        <h3 className="text-[#657786] text-sm font-bold">
                          Trending in US
                        </h3>
                        <p className="text-[#14171A] text-sm font-bold ">
                          {article.title}
                        </p>
                    </div>
                    <img className="sm:h-auto sm:w-full xl:w-20 xl:h-20 m-auto rounded" src={article.urlToImage} alt="" />
                </div>
  ))}
        </div>
        <div className="text-[#d9d9d9] space-y-3 bg-[#F5F8FA] pt-2 rounded-xl xl:w-9/12 mt-4 shadow-lg">
        <h4 className="font-bold text-xl text-[#14171A] px-4 py-2">Who to follow</h4>
        {followResults.map((result, index) => (
          <div
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
            key={index}
          >
            <Image
              src={result.userImg}
              width={50}
              height={50}
              objectFit="cover"
              className="rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold text-[#14171A] group-hover:underline">
                {result.username}
              </h4>
              <h5 className="text-[#657786] text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full font-bold text-sm py-1.5 px-3.5 hover:text-[#1DA1F2]">
              Follow
            </button>
          </div>
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>
    </div>
  )
}

export default Widgets