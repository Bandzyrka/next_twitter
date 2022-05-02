import { ChartBarIcon,PhotographIcon, EmojiHappyIcon, GiftIcon, XIcon } from '@heroicons/react/outline'
import React, { useState, useRef } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { db, storage } from '../../firebase'
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";

const Input = () => {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickRef = useRef(null)
  const [emojiPicker, setEmojiPicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data: {user: {name, tag, image, uid}} } = useSession();

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
      id: uid,
      username: name,
      userImg: image,
      tag: tag,
      text: input,
      timestamp: serverTimestamp()
    })
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
  
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
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
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  return (
    <>
    {!loading ? <div className="flex space-x-3 overflow-y-hidden border-b-8 border-[#E1E8ED] p-3">
      <img
        src={image}
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
                src={selectedFile}
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
              <input type="file" hidden onChange={addImageToPost} ref={filePickRef} />
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
            disabled={(!/[a-zA-Z]|ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]+/g.test(input))} 
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
      : 
        <svg role="status" className="m-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
        </svg>
      
    }
  </>
    )
}

export default Input
