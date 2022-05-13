import React, {useState, useEffect} from 'react'

const Widgets = ({news: {articles}}) => {
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
    </div>
  )
}

export default Widgets