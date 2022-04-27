import { ChartBarIcon,PhotographIcon, EmojiHappyIcon, GiftIcon, XIcon } from '@heroicons/react/outline'
import React, { useState, useRef } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { db, storage } from '../../firebase'
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

const Input = () => {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickRef = useRef(null)
  const [emojiPicker, setEmojiPicker] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };
  
  const sendPost = async () => {
    if(loading) return;
    setLoading(true)
    
    const docRef = await addDoc(collection(db, "posts"),{
      text: input,
      timestamp: serverTimestamp()
    })
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
  
    if (selectedFile) {
      await uploadString(imageRef, selectedFile).then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setEmojiPicker(false);
  }
  return (
    <div className="flex space-x-3 overflow-y-hidden border-b-8 border-[#E1E8ED] p-3">
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
            <div className="icon" onClick={() => setEmojiPicker(!emojiPicker)} >
              <EmojiHappyIcon className="h-[28px] text-[#1DA1F2]" />
      
              </div>
            <div className="icon">
              <GiftIcon className="h-[28px] text-[#1DA1F2]" />
            </div>
            <div className="icon">
              <ChartBarIcon className="h-[28px] text-[#1DA1F2] rotate-90" />
            </div>    
          </div>
          <button 
            disabled={!/[a-zA-Z]|ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]+/g.test(input)} 
            className="ml-auto disabled:opacity-50 hidden h-12 w-28 rounded-full bg-[#1DA1F2] text-lg font-bold text-[#E1E8ED] shadow-md transition duration-150 ease-in-out hover:scale-105 active:scale-100 xl:inline"
            onClick={() => sendPost()}
            >
      {' '}
      Tweet{' '}
    </button>
        </div>
        {emojiPicker && (
          <div className="absolute">
            <Picker style={{borderRadius: '20px', maxWidth: '310px'}}
              onSelect={(event) => addEmoji(event)}
            />
          </div>
        )}
      </div>
    
      </div>
    
  )
}

export default Input
