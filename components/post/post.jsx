import { ChatIcon, HeartIcon, SaveIcon, ShareIcon, DotsHorizontalIcon} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled} from '@heroicons/react/solid';
import { db } from '../../firebase';
import React, {useState, useEffect} from 'react'
import { useSession } from "next-auth/react";
import {modalState} from '../../atoms/ModalAtom'
import {postState} from '../../atoms/ModalAtom'
import { useRecoilState } from 'recoil';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";

const Post = ({post, id}) => {
  const {image, tag, text, timestamp, userImg, username} = post
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postID, setPostID] = useRecoilState(postState);

  const likePost = async () => {
    if(isLiked){
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
    } else{
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        name: session.user.name
      })
    }   
  }
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      setIsLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  
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
          <div className="flex items-center justify-center">
            <ChatIcon className="h-7" onClick={() => {
            setIsOpen(true)
            setPostID(id)}}
            />
            <p className={`text-xl ${comments.length === 0 ? "text-white": "flex"}`}>{comments.length}</p>
          </div>
          <div className="flex items-center justify-center">
          {
            isLiked ?
              <HeartIconFilled 
                className="h-7 text-pink-500 flip-in-hor-top"
                onClick={likePost}
              />
              :
              <HeartIcon 
                className="h-7 hover:text-pink-500"
                onClick={likePost}
              />
          }
            <p className={`text-xl ${likes.length === 0 ? "text-white": "flex"}`}>{likes.length}</p>
          </div>
          <ShareIcon className="h-7"/>
          <SaveIcon className="h-7"/>
      </div>
    </div>
  )
}

export default Post