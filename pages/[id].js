import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
  } from "@firebase/firestore";
  import { getProviders, getSession, useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { useRecoilState } from "recoil";
  import { modalState } from "../atoms/modalAtom";
  import Modal from "../components/modal/modal";
  import Sidebar from "../components/sidebar/sidebar";
  import Post from "../components/post/post";
  import { db } from "../firebase";
  import { ArrowLeftIcon } from "@heroicons/react/solid";
  import Comment from "../components/comment/comment"
  import Head from "next/head";
  
  function PostPage({  providers }) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const { id } = router.query;
  
    useEffect(
      () =>
        onSnapshot(doc(db, "posts", id), (snapshot) => {
          setPost(snapshot.data());
        }),
      [db]
    );
  
    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "posts", id, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => setComments(snapshot.docs)
        ),
      [db, id]
    );
  
    if (!session) return <Login providers={providers} />;
  
    return (
      <div>
        <Head>
          <title>
            {post?.username} on Twitter: "{post?.text}"
          </title>
          <link rel="icon" href="../public/favicon.ico" />
        </Head>
        <main className="bg-[#F5F8FA] min-h-screen flex max-w-[1500px] mx-auto">
          <Sidebar />
          <div className="flex-grow border-l  max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            <div className="flex items-center px-1.5 py-2 text-[#14171A] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-[#F5F8FA]">
              <div
                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                onClick={() => router.push("/")}
              >
                <ArrowLeftIcon className="h-5 text-black" />
              </div>
              Tweet
            </div>
  
            <Post post={post} id={id} postPage />
            {comments.length > 0 && (
              <div className="pb-72">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    comment={comment.data()}
                  />
                ))}
              </div>
            )}
          </div>
          {isOpen && <Modal />}
        </main>
      </div>
    );
  }
  
  export default PostPage;
  
  export async function getServerSideProps(context) {
    const providers = await getProviders();
    const session = await getSession(context);
  
    return {
      props: {
        providers,
        session,
      },
    };
  }