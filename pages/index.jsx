import {useState,useEffect} from 'react';
import Modal from '../components/Modal';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import Header from '../components/Header';
import SearchBarMenu from '../components/SearchBarMenu';
import HomePosts from '../components/HomePosts';
import RelatedPostWidget from '../components/PostWidget';
import Post from '../components/Post';
import { db,auth } from '../firebase/firebaseConfig';
import {collection,getDocs,limit,orderBy,query} from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth';

const Home = ({allPosts,allCategories,alldocWidgetRelated}) => {
  const [showPosts,setAllPosts] = useState(JSON.parse(allPosts))
  const showCategories = JSON.parse(allCategories);
  const showAllDocWidgetRelated = JSON.parse(alldocWidgetRelated);
  const [isLogIn,setIsLogIn] = useState(false);
  const [isSignUp,setIsSignUp] = useState(false);
  const [toggleModal,setToggleModal] = useState(false)
  const [openPost,setOpenPost] = useState(false)
  const [isAuth,setIsAuth] = useState(false);
  const [DisplayPostId,setDisplayPost] = useState(null);
  const [signInUserInfo,setSignInUserInfo] = useState({})
  const [user,setUser] = useState({})
  const [postId,setPostId] = useState(null);
  const [authorId,setAuthorId] = useState(null)


  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
})

  const setPost = (postId) =>{
    setDisplayPost(postId)
    setOpenPost(true);
  }
  
  const selectedCategory = (selectedCategoryId) =>{
    setPostId(selectedCategoryId)
    setOpenPost(false);
  }
  
  const selectedAuthor = (selectedAuthorId) =>{
    setAuthorId(selectedAuthorId)
    setOpenPost(false);
  }

  useEffect(()=>{
    setIsAuth(localStorage.getItem('isAuth'));
  },[])

  return (
    <div className='relative'>
      <Header
       setAuthorId={setAuthorId}
       setPostId={setPostId}
       user={user}
       signInUserInfo={signInUserInfo}
       setSignInUserInfo={setSignInUserInfo}
       setOpenPost={setOpenPost}
       selectedCategory={selectedCategory}
       showCategories={showCategories}
       setIsAuth={setIsAuth}
       isAuth={isAuth} 
       setToggleModal={setToggleModal} 
       setIsLogIn={setIsLogIn}
       />
       
      <SearchBarMenu setPostId={setPostId}  setAuthorId={setAuthorId} selectedCategory={selectedCategory} selectedAuthor={selectedAuthor}/>
      
      {openPost?<Post user={user} isAuth={isAuth} DisplayPostId={DisplayPostId} setOpenPost={setOpenPost}></Post>
      :<HomePosts isAuth={isAuth} authorId={authorId}  postId={postId} setPost={setPost}/>}
      {toggleModal?<Modal setPostId={setPostId} setAuthorId={setAuthorId} showCategories={showCategories} setToggleModal={setToggleModal}/>:null}
      
      {isLogIn?<LogIn setIsAuth={setIsAuth} setIsLogIn={setIsLogIn} setIsSignUp={setIsSignUp}></LogIn>:null};
      {isSignUp?<SignUp setIsSignUp={setIsSignUp} setIsLogIn={setIsLogIn}></SignUp>:null};
      
      <RelatedPostWidget 
      showPosts={showPosts}
      setPost={setPost} 
      showAllDocWidgetRelated={showAllDocWidgetRelated}
      openPost={openPost}
      />

    </div>
  )
}
export default Home;

export const  getServerSideProps = async () => {
  
  const postCollectionRef = collection(db,'post');
  const categoryCollectionRef = collection(db,'category');
  
  const docQuery =  await query(postCollectionRef,orderBy('createdAt','desc'),limit(10));
  const docWidgetRelatedQuery =  await query(postCollectionRef,orderBy('category','desc'),limit(4));
  
  const docPosts = await getDocs(docQuery);
  const docCategories = await getDocs(categoryCollectionRef);
  const docWidgetRelated = await getDocs(docWidgetRelatedQuery);
  
  const allPosts = docPosts.docs.map((doc)=>({...doc.data(),id:doc.id})) 
  const allCategories = docCategories.docs.map((doc)=>({...doc.data(),id:doc.id})) 
  const alldocWidgetRelated = docWidgetRelated.docs.map((doc)=>({...doc.data(),id:doc.id})) 
  
  return {
      props:{
       allPosts: JSON.stringify(allPosts,null,1),
       allCategories: JSON.stringify(allCategories,null,1),
       alldocWidgetRelated:JSON.stringify(alldocWidgetRelated,null,1),
      }
  }
}
