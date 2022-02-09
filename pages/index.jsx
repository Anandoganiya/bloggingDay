import {useState,useEffect} from 'react';
import Modal from '../components/Modal'
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import Header from '../components/Header';
import SearchBarMenu from '../components/SearchBarMenu';
import HomePosts from '../components/HomePosts';
import RelatedPostWidget from '../components/PostWidget';
import Post from '../components/Post';
import { db } from '../firebase/firebaseConfig';
import {collection,getDocs,orderBy,query} from 'firebase/firestore'

const Home = ({allPosts,allCategories}) => {
  const showPosts = JSON.parse(allPosts);
  const showCategories = JSON.parse(allCategories);
  const [isLogIn,setIsLogIn] = useState(false);
  const [isSignUp,setIsSignUp] = useState(false);
  const [toggleModal,setToggleModal] = useState(false)
  const [openPost,setOpenPost] = useState(false)  
  const [isAuth,setIsAuth] = useState(false);
  const [DisplayPost,setDisplayPost] = useState(null);
  const setPost = (postId) =>{
    const post = showPosts.filter(post=> post.id === postId);
    setDisplayPost(post)
    setOpenPost(true);
  }
  useEffect(()=>{
    setIsAuth(localStorage.getItem('isAuth'));
  },[])
  return (
    <div className='relative'>
      <Header showCategories={showCategories} setIsAuth={setIsAuth} isAuth={isAuth} setToggleModal={setToggleModal} setIsLogIn={setIsLogIn}/>
      <SearchBarMenu/>
      {openPost?<Post DisplayPost={DisplayPost} setOpenPost={setOpenPost}></Post>:<HomePosts setPost={setPost} showPosts={showPosts} setOpenPost={setOpenPost}/>}
      {toggleModal?<Modal showCategories={showCategories} setToggleModal={setToggleModal}/>:null}
      {isLogIn?<LogIn setIsLogIn={setIsLogIn} setIsSignUp={setIsSignUp}></LogIn>:null};
      {isSignUp?<SignUp setIsSignUp={setIsSignUp} setIsLogIn={setIsLogIn}></SignUp>:null};
      <RelatedPostWidget openPost={openPost} setOpenPost={setOpenPost}/>
    </div>
  )
}
export default Home;

export const  getStaticProps = async () => {
  const postCollectionRef = collection(db,'post');
  const categoryCollectionRef = collection(db,'category');
  const docQuery =  await query(postCollectionRef,orderBy('createdAt','desc'));
  const docPosts = await getDocs(docQuery);
  const docCategories = await getDocs(categoryCollectionRef);
  const allPosts = docPosts.docs.map((doc)=>({...doc.data(),id:doc.id})) 
  const allCategories = docCategories.docs.map((doc)=>({...doc.data(),id:doc.id})) 
  
  return {
      props:{
       allPosts: JSON.stringify(allPosts,null,1),
       allCategories: JSON.stringify(allCategories,null,1)
      }
  }
}
