import React ,{ useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ChartBarIcon,PhotographIcon, EmojiHappyIcon, GiftIcon, XIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import {modalState} from '../../atoms/ModalAtom'
import { useRecoilState } from 'recoil';
import {postState} from '../../atoms/ModalAtom'
import { useSession } from "next-auth/react";
import { db } from '../../firebase';
import { useRouter } from 'next/router'

import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from "@firebase/firestore";

const Modal = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postID, setPostID] = useRecoilState(postState)
  const [post, setPost] = useState()
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const router = useRouter()

  
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postID), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );
  
  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", postID, "comments"), {
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setIsOpen(false);
    setComment("");
    router.push(`/${postID}`);
  };
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div class="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl rounded-xl shadow-2xl bg-[#F5F8FA]">
          <Dialog.Title className="text-black p-2">
            <XIcon 
            className="h-7"
            onClick={() => setIsOpen(false)}
            />
          </Dialog.Title>
          <div className="bg-[#F5F8FA] shadow-2xl rounded-xl w-full h-auto flex flex-col">
            <div className="flex w-full px-10 py-5  ">
              <div className="flex w-full">
                <img
                  src={post?.userImg}
                  alt="profile"
                  className="h-11 w-11 cursor-pointer rounded-full"
                />
                <div className="flex flex-col w-full">
                  <div className="flex ml-2 w-full justify-between items-center">
                    <div className="flex">
                      <h3 className="font-bold text-black">{post?.username}</h3>
                      <p className="text-[#657786] ml-2">{post?.tag}</p>
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="text-black">
                      {post?.text}
                    </p>
                  </div>
                  <div>
                  {
                  post?.image && <img src={post?.image} alt="0" className="max-h-80 rounded-2xl object-contain mt-4"/>
                  }
                  </div>
                </div>
              </div>
            </div> 
            <div className="flex w-full p-10">
              <img
                src={"https://lh3.googleusercontent.com/a-/AOh14Gh9vEBt-jQgy2DU644UKBt-aWnjHnahOqtqieiKLw=s96-c"}
                alt="profile"
                className="h-11 w-11 cursor-pointer rounded-full"
                />
                <textarea
                value={comment}
                rows="1"
                className="min-h-[44px] w-full bg-transparent text-lg tracking-wide text-gray-800 outline-none p-2"
                placeholder="Tweet your reply?"
                onChange={(event) => setComment(event.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center mb-2 px-20">
                <div className="icon">
                  <PhotographIcon className="h-[22px] text-[#1da0f2d4]" />
                </div>
                <div className="icon">
                  <EmojiHappyIcon className="h-[22px] text-[#1da0f2d4]" />
                  </div>
                <div className="icon">
                  <GiftIcon className="h-[22px] text-[#1da0f2d4]" />
                </div>
                <div className="icon">
                  <ChartBarIcon className="h-[22px] text-[#1da0f2d4] rotate-90" />
                </div> 
                <button 
                  onClick={sendComment}
                  className="ml-auto disabled:opacity-50 h-8 w-20 rounded-full bg-[#1DA1F2] text-sm font-bold text-[#E1E8ED] shadow-md transition duration-150 ease-in-out hover:scale-105 active:scale-100 xl:inline">
                  {' '}
                  Reply{' '}
                </button>
            </div>
            </div>        
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
    </Transition>
    )
}
export default Modal;