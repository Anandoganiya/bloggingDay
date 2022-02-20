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
import {collection,getDocs,limit,orderBy,query} from 'firebase/firestore'

const Home = ({allPosts,allCategories,alldocWidgetRelated}) => {
  const [showPosts,setAllPosts] = useState(JSON.parse(allPosts))
  const showCategories = JSON.parse(allCategories);
  const showAllDocWidgetRelated = JSON.parse(alldocWidgetRelated);
  const [isLogIn,setIsLogIn] = useState(false);
  const [isSignUp,setIsSignUp] = useState(false);
  const [toggleModal,setToggleModal] = useState(false)
  const [openPost,setOpenPost] = useState(false)
  const [isAuth,setIsAuth] = useState(false);
  const [DisplayPost,setDisplayPost] = useState(null);
  const [categorySelected,setCategorySelected] = useState([])
  const [flag,setFlag] = useState(false)
  const setPost = (postId) =>{
    // const post = showPosts.filter(post=> post.id === postId);
    setDisplayPost(postId)
    setOpenPost(true);
  }
  
  const selectedCategory = (selectedCategoryId) =>{
    const showCategoryPosts = showPosts.filter(post=> post.categoryId === selectedCategoryId);
    setCategorySelected(showCategoryPosts)
    setOpenPost(false);
    setFlag(true)
  }

  useEffect(()=>{
    setIsAuth(localStorage.getItem('isAuth'));
  },[])

  return (
    <div className='relative'>

      <Header
       setOpenPost={setOpenPost}
       setFlag={setFlag}
       selectedCategory={selectedCategory}
       showCategories={showCategories}
       setIsAuth={setIsAuth}
       isAuth={isAuth} 
       setToggleModal={setToggleModal} 
       setIsLogIn={setIsLogIn}/>
       
      <SearchBarMenu/>
      
      {openPost?<Post isAuth={isAuth} DisplayPost={DisplayPost} setOpenPost={setOpenPost}></Post>
      :<HomePosts setPost={setPost} showPosts={flag?categorySelected:showPosts} setOpenPost={setOpenPost}/>}
      
      {toggleModal?<Modal showCategories={showCategories} setToggleModal={setToggleModal}/>:null}
      
      {isLogIn?<LogIn setIsLogIn={setIsLogIn} setIsSignUp={setIsSignUp}></LogIn>:null};
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
