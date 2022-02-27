import {useState,useRef,useEffect} from 'react';
import {categoriesMenu,sideMenuIconsStyles,category,handburgerMenu,top_line,middle_line,bottom_line,
rotate_top,rotate_bottom,hide_line,sideMenu,profile_info,show} from '../styles/Header.module.css';
import {AiOutlineHome} from 'react-icons/ai';
import {BsCircle} from 'react-icons/bs';
import {FaPencilAlt} from 'react-icons/fa'
import {AiOutlineLogout} from 'react-icons/ai' 
import {BiLogIn} from 'react-icons/bi'
import {FcGoogle} from 'react-icons/fc'
import { IconContext } from "react-icons";
import { auth,googleProvider} from '../firebase/firebaseConfig';
import {signInWithPopup,signOut} from 'firebase/auth'
import moment from 'moment'
import {db} from '../firebase/firebaseConfig'
import {collection,addDoc,getDocs} from 'firebase/firestore'

const Header = (props) => {
    const {
        setToggleModal,
        setIsLogIn,
        setIsAuth,
        isAuth,
        showCategories,
        selectedCategory,
        setFlag,
        setOpenPost
    } = props;
    const [toggle,setToggle] = useState(false);
    const [authorInfo,setAuthorInfo] = useState({authorName:'',authorProfileImage:''}) 
    const sideMenuRef = useRef()
    
    const signInWithGoogle = () => {
         signInWithPopup(auth,googleProvider).then(async(userInfo)=>{
            localStorage.setItem('isAuth',true);
            setIsAuth(true)
            localStorage.setItem('authorName',userInfo.user.displayName)
            localStorage.setItem('authorProfileImage',userInfo.user.photoURL)
            setAuthorInfo({
                ...authorInfo,
                authorName:userInfo.user.displayName,
                authorProfileImage:userInfo.user.photoURL
            });
          const authorCollectionRef = collection(db,'author');
          const users = await getDocs(authorCollectionRef)
          const allAuthors = users.docs.map((doc)=>({...doc.data(),id:doc.id})) 
          const res = allAuthors.filter(doc=>{
              return doc.userId === userInfo.user.uid;
          })
          if(res.length === 0){              
              addDoc(authorCollectionRef,{
                userId:userInfo.user.uid,
                email:userInfo.user.email,
                displayName:userInfo.user.displayName,
                photoUrl:userInfo.user.photoURL,
              })
          }
        }).catch((error)=>{
            console.log(error);
        });
    }
    
    const toggleHamburgerMenu = () => {
        setToggle(!toggle);
        const sideMenu = sideMenuRef.current;
        sideMenu.classList.toggle(`${show}`);
    }

    useEffect(() => {
        setAuthorInfo({
            ...authorInfo,
            authorName:localStorage.getItem('authorName'),
            authorProfileImage:localStorage.getItem('authorProfileImage')
        });
        if(toggle){
            document.body.style.overflow = 'hidden';
        }
        return ()=> document.body.style.overflow = 'unset';
     }, [toggle]);
    
    return (
        <>
            <div className={`${handburgerMenu}`} onClick={()=>toggleHamburgerMenu()}>
                <span className={toggle?`${top_line} ${rotate_top}`:`${top_line}`}></span>
                <span className={toggle?`${middle_line} ${hide_line}`:`${middle_line}`}></span>
                <span className={toggle?`${bottom_line} ${rotate_bottom}`:`${bottom_line}`}></span>
            </div>
            <SideBarMenu 
             setOpenPost={setOpenPost}
             setFlag={setFlag}
             selectedCategory={selectedCategory}
             showCategories={showCategories}
             authorInfo={authorInfo}
             isAuth={isAuth}
             setIsAuth={setIsAuth}
             sideMenuRef={sideMenuRef}
             setToggleModal={setToggleModal}
             setIsLogIn={setIsLogIn}
             signInWithGoogle={signInWithGoogle}
            />
        </>   
    )
}

const SideBarMenu = (props) => {
    const {
        setOpenPost,
        setFlag,
        sideMenuRef,
        setToggleModal,
        setIsLogIn,isAuth,
        signInWithGoogle,
        setIsAuth,
        authorInfo,
        showCategories,
        selectedCategory,
    } = props;
    return (
        // w-60 = 15rem 
        <div ref={sideMenuRef} className={`${sideMenu} z-[3] sm:z-0 font-sans fixed shadow-2xl rounded-r-2xl w-60 h-screen bg-[#FAEEE7]`}>
            <div className={`p-[1rem] ${profile_info}`}>
                {isAuth?<UserLogOut authorInfo={authorInfo} setIsAuth={setIsAuth}/>:<UserLogIn setIsLogIn={setIsLogIn} signInWithGoogle={signInWithGoogle}/>}
            </div>
            <div className='text-lg'>
                    <ul className={`h-[29rem] overflow-y-auto ${categoriesMenu}`}>
                        {isAuth?<li className='hover:cursor-pointer text-center mb-2'>
                        <button onClick={()=>{setToggleModal(true)}} className='border  border-blue-600 font-sans text-lg font-semibold px-8 py-2 transition-all duration-100 rounded-full hover:bg-[#548CFF] hover:text-white'>
                        <FaPencilAlt className='inline mr-1'/> Create Post</button></li>:null}
                        <IconContext.Provider value={{size:'2.5rem',className:`${sideMenuIconsStyles}` }}>
                            <li onClick={()=>{setFlag(false);setOpenPost(false);}} className='hover:cursor-pointer font-semibold'><AiOutlineHome className={`m-[1rem] ${category}`}/>Home</li>
                            {showCategories.map(cat=>{
                                return(
                                    <li key={cat.id} onClick={()=>{selectedCategory(cat.id);}} className='hover:cursor-pointer font-semibold'><BsCircle className={`m-[1rem] ${category}`}/>{cat.categoryName}</li>
                                );
                            })}
                            {/* <li className='hover:cursor-pointer font-semibold'><SiStylelint className={`m-[1rem] ${category}`}/>Lifestyle</li>
                            <li className='hover:cursor-pointer font-semibold'><MdOutlineEmojiFoodBeverage className={`m-[1rem] ${category}`}/>Food</li>
                            <li className='hover:cursor-pointer font-semibold'><AiOutlineHome className={`m-[1rem] ${category}`}/>Home</li>
                            <li className='hover:cursor-pointer font-semibold'><BsCircle className={`m-[1rem] ${category}`}/>International</li>
                            <li className='hover:cursor-pointer font-semibold'><SiStylelint className={`m-[1rem] ${category}`}/>Lifestyle</li>
                            <li className='hover:cursor-pointer font-semibold'><MdOutlineEmojiFoodBeverage className={`m-[1rem] ${category}`}/>Food</li> */}
                        </IconContext.Provider>
                    </ul>
            </div>
        </div>
    );
}

const UserLogIn = ({setIsLogIn,signInWithGoogle}) => {
    return(
    <div className='w-full'>
        <IconContext.Provider value={{size:'1.5rem',className:'bg-white'}}>
            <button onClick={()=>{setIsLogIn(true)}} className='bg-white w-full flex justify-start content-center p-3 align-baseline font-semibold mb-2'><BiLogIn/><p className='ml-4'>sign-In/sing-Up</p></button>
            <button onClick={()=>(signInWithGoogle())} className='bg-white w-full flex justify-start content-center p-3 align-baseline font-semibold'><FcGoogle/><p className='ml-4'>sign in with Google</p></button>
        </IconContext.Provider>
    </div>
    );
}

const UserLogOut = ({setIsAuth,authorInfo}) => {
    const userLogOut = () => {
        setIsAuth(false);
        localStorage.clear();
        signOut(auth);
    }
    return (
    <>
         <div className='flex justify-between items-center'>
            <img className="w-14 h-14 border-2 border-white rounded-full" src={authorInfo.authorProfileImage} alt="profile Image" />
            <button onClick={()=>(userLogOut())} className='text-[2rem] hover:text-white cursor-pointer'><AiOutlineLogout/></button>
        </div>
        <div className='pl-[.5rem] pt-[.2rem] text-lg'>
            <div className='font-bold'>
                {authorInfo.authorName}
            </div>
            <div className='text-sm font-semibold'>
               {moment().format('LL')}
            </div>
            <div className='text-sm'>
               {moment().format('LT')}
            </div>
        </div>
    </>
    );
}


export default Header;
