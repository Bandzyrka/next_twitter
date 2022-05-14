import React, {useState, useEffect} from 'react'
import Trending from '../trends/trends'
import Image from "next/image";


const Widgets = ({news: {articles}, followResults}) => {
  console.log(articles)
  return (
    <div className="hidden h-full flex-col items-center p-2 md:w-[640px] md:flex xl:items-start">
        <input 
            type="text" 
            className="bg-gray-500 h-10 rounded-2xl w-full p-4" 
            placeholder="Search Twitter"
        />
        <div className="bg-gray-500 h-auto w-full p-4 mt-4 rounded-xl">
            <h1 className="text-bold text-lg text-white mb-4">What's happening?</h1>
            {articles.map(article =>(
                <div className="flex w-full p-2">
                    <div className="flex flex-col">
                        <h3>Trending in US</h3>
                        <p>{article.title}</p>
                    </div>
                    <img className="h-16 w-16 rounded" src={article.urlToImage} alt="" />
                </div>
  ))}
        </div>
        <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
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
              <h4 className="font-bold group-hover:underline">
                {result.username}
              </h4>
              <h5 className="text-gray-500 text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
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