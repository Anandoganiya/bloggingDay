import {useState,useRef,useEffect} from 'react';
import {modal_container} from '../styles/Modal.module.css'
import {ImCross} from 'react-icons/im';
import {AiOutlineCamera} from 'react-icons/ai';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {collection,addDoc} from 'firebase/firestore'
import {auth,db,firebaseStorage} from '../firebase/firebaseConfig'
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'

const SignUp = ({setIsSignUp,setIsLogIn}) => {
  const [signUpEmail,setSignUpEmail] = useState('')
  const [signUpPassword,setSignUpPassword] = useState('')
  const [userName,setUserName] = useState('')
  const fileUploadRef = useRef(null);
  const [imageFile,setImageFile] = useState('');
  const [isSubmit,setIsSubmit] = useState(false)
  const [isError,setIsError] = useState({})
  const [loading,setLoading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault()
    fileUploadRef.current.click();
    fileUploadRef.current.addEventListener('change',(e)=>{ 
      setImageFile(e.target.files[0]);
    })
    return;
  }

  const validate = (e) => {
    e.preventDefault()
    const signUpError = {};
    if(!signUpEmail){
      signUpError.emailErr = 'email is required';
    }
    if(!userName){
      signUpError.userNameErr = 'username is required';
    }
    if(!signUpPassword){
      signUpError.passwordErr = 'password is required';
    }
    if(!imageFile){
      signUpError.imageErr = 'image is required';
    }
    setIsError(signUpError);
    setIsSubmit(true)
    return;
  }

  useEffect(()=>{
    if(Object.keys(isError).length === 0 && isSubmit){
      (async()=>{
        setLoading(true)
        try{
          //handle the error when image is not selected
          const imageRef = ref(firebaseStorage,imageFile.name);
          const uploadTask = uploadBytesResumable(imageRef,imageFile);
          const authorCollectionRef = collection(db,'author');
          const user = await createUserWithEmailAndPassword(
            auth,
            signUpEmail,
            signUpPassword
          ).then(cred=>{
            uploadTask.then(()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                addDoc(authorCollectionRef,{
                  userId:cred.user.uid,
                  email:signUpEmail,
                  // password:signUpPassword,
                  displayName:userName,
                  photoUrl:downloadURL,
                })
                updateProfile(auth.currentUser,{
                  displayName:userName,
                  photoURL:downloadURL
                }).catch(error=>{
                  console.log(error);
                })
              });
            })
          })
          setLoading(false)
          setIsLogIn(true)
          setIsSignUp(false)
        }catch(error){
          console.log(error);
          const errorMessage = error.message.slice(10)
          setIsError({
            ...isError,
            firebaseError:errorMessage,
          })
          setLoading(false)
        }
      })()
      
    }
    
  },[isError])

  return(
    <div className={`${modal_container}`}>
    <div className={`absolute top-[-10%] md:w-1/2 w-full rounded-lg  shadow-2xl drop-shadow-2xl p-1 z-[100] bg-white mt-[10rem] font-sans flex justify-center`}>
   
      <div className='w-full sm:m-5 p-2'>
        <form action="#">
            <div className='border-b-black border-b text-center font-bold text-lg'>SIGNUP</div>
                    <div><span className='text-red-300 text-lg font-semibold'>{isError.firebaseError}</span></div> 
           <div className='w-full sm:m-2 mt-2'>
                <label className='text-lg font-semibold'>
                    <div>Username <span className='text-red-300'>*{isError.userNameErr}</span></div> 
                   <input onChange={(e)=>{setUserName(e.target.value)}} className='border-b border-b-black  outline-none md:w-auto w-full ' type="text" placeholder='enter username' />
                </label>
           </div>
           <div className='w-full sm:m-2 mt-2'>
                <label className='text-lg font-semibold'>
                    <div>Email <span className='text-red-300'>*{isError.emailErr}</span></div> 
                   <input onChange={(e)=>{setSignUpEmail(e.target.value)}} className='border-b border-b-black  outline-none md:w-auto w-full ' type="email" placeholder='enter email' />
                </label>
           </div>
           <div className='w-full sm:m-2'>
                <label className='text-lg font-semibold'>
                    <div>Password <span className='text-red-300'>*{isError.passwordErr}</span></div> 
                   <input onChange={(e)=>{setSignUpPassword(e.target.value)}} className='border-b border-b-black  outline-none md:w-auto w-full ' type="password" placeholder='enter password' />
                </label>
           </div>

           <div className=' text-2xl flex '>
              <button className='cursor-pointer hover:text-gray-500' onClick={(e)=>{handleUpload(e)}}>
                <AiOutlineCamera/>
              </button>
              <span className='lg:ml-2 text-lg font-semibold text-red-300 p-1 lg:p-0 lg:inline block mb-3'>*{isError.imageErr}</span>
              <input ref={fileUploadRef} type='file' style={{display:'none'}} accept='image/png,image/jpeg,image/jpg'/>
            </div>
              <div className=' pb-1 '>{imageFile?.name || 'Upload Profile'}</div>
              {
               loading?<div className='w-full sm:inline flex justify-center'><img height={40} width={40} src='spinner.gif'></img></div>:
                <button onClick={(e)=>validate(e)} 
                className='bg-blue-500 block hover:bg-blue-600 md:rounded-full hover:text-white
                font-semibold shadow-xl px-8 py-2 text-center sm:m-2 mt-2 md:w-auto w-full'>SignUp</button>
             }
            <p onClick={()=>{setIsSignUp(false);setIsLogIn(true)}} className='sm:mt-auto mt-2'>Already have account<span className='hover:text-blue-500 cursor-pointer ml-2 text-blue-900 font-semibold'>Log-In</span></p>
        </form>
      </div>

      <div onClick={()=>{setIsSignUp(false)}} className='hover:text-[red] cursor-pointer absolute right-0 sm:p-2 p-2'>
        <ImCross/>
      </div>
      
    </div>
    </div>
  )
};

export default SignUp;
