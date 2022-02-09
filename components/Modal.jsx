import React,{useState,useRef,useEffect} from 'react';
import {modal_container} from '../styles/Modal.module.css'
import {ImCross} from 'react-icons/im';
import {AiOutlineCamera} from 'react-icons/ai';
import {collection,addDoc,serverTimestamp} from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import {auth,db,firebaseStorage} from '../firebase/firebaseConfig'

const Modal = ({setToggleModal,showCategories}) => {
  const [inputTitle,setTitle] = useState('')
  const [inputDescription,setInputDescription] = useState('')
  const [inputCategory,setCategory] = useState('')
  const [isError,setIsError] = useState({})
  const [isSubmit,setIsSubmit] = useState(false)
  const [loading,setLoading] = useState(false);
  const fileUploadRef = useRef(null);
  const [imageFile,setImageFile] = useState('');
  const [progress,setProgress] = useState(0);
  const postCollectionRef = collection(db,'post');

  const handleUpload = () => {
    fileUploadRef.current.click();
    fileUploadRef.current.addEventListener('change',(e)=>{ 
      setImageFile(e.target.files[0]);
    })
    return ;
  }
  
  const postData =  () => {
    setIsError(validate());
    setIsSubmit(true)
    return;
  }

  const validate =  () => {
    const title =   inputTitle;
    const desc = inputDescription;
    const category = inputCategory;
    const modalError = {};
    if(!title){
      modalError.titleError = 'title is required';
    }
    if(!desc){
      modalError.descriptionError = 'description is required';
    }
    if(!category){
      modalError.categoryError = 'category is required';
    }
    if(!imageFile){
      modalError.imageError = 'image is required';
    }
    return modalError;
  }

  useEffect(()=>{
    if(Object.keys(isError).length === 0 && isSubmit){
      (()=>{
        setLoading(true);
        const imageRef = ref(firebaseStorage,imageFile.name);
        const uploadTask = uploadBytesResumable(imageRef,imageFile);
         uploadTask.on('state_changed',(snapshot)=>{
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if(prog === 100){
           const timeOut = setTimeout(() => {
            setLoading(false)
            setToggleModal(false)
           }, 1000);
          }
          setProgress(prog);
       },(error)=>{
         console.log(error);
       }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(postCollectionRef,{
            title:inputTitle || null,
            content:inputDescription || null,
            author:{
              name:auth.currentUser.displayName || null,
              id:auth.currentUser.uid || null,
              authorPhoto:auth.currentUser.photoURL,
            },
            featuredImageUrl: downloadURL,
            category:inputCategory,
            createdAt:serverTimestamp(),
          })
        });
       })
      })();
    }
  },[isError]);
    
  return (
      <div className={`${modal_container}`}>
      <div className={`absolute top-[-20%] md:w-1/2 w-full rounded-lg  shadow-2xl drop-shadow-2xl p-1 z-[100] bg-white mt-[10rem] font-sans flex justify-center`}>
        {/* title */}
        <div className='w-full sm:m-5 p-2'>
          <div className=' w-full'>
            <p className='font-semibold text-lg'>Title <span className='lg:ml-2 text-lg font-semibold text-[#FF1700] p-1 lg:p-0 lg:inline block'>*{isError.titleError}</span></p>
            <textarea   onChange={e=>setTitle(e.target.value)}  name="" id="" cols="50" rows="2" className='bg-white outline-none leading-[20px] min-h-[42px] w-full cursor-auto'></textarea>
          </div>
          {/* description */}
          <div className='w-full'>
            <p className='font-semibold text-lg'>Description <span className='lg:ml-2 text-lg font-semibold text-[#FF1700] p-1 lg:p-0 lg:inline block'>*{isError.descriptionError}</span></p>
            <textarea   onChange={e=>setInputDescription(e.target.value)}  name="" id="" cols="50" rows="5" className='bg-white outline-none leading-[20px] min-h-[42px] w-full cursor-auto'></textarea>
            <div className='text-lg font-semibold'>
              <select  onChange={e=>setCategory(e.target.value)} id="category" className='ouline-none bg-white  outline-none cursor-pointer'>
                <option value="">category</option>
                {showCategories.map(cat=>{
                  return <option key={cat.id} value={cat.categoryName}>{cat.categoryName}</option>;
                })}
              </select>
              <span className='lg:ml-2 text-lg font-semibold text-[#FF1700] p-1 lg:p-0 lg:inline block mb-3'>*{isError.categoryError}</span>
            </div>
            <div className='p-1 inline-block text-2xl'>
              <button className='cursor-pointer hover:text-gray-500' onClick={()=>{handleUpload()}}>
                <AiOutlineCamera/>
              </button>
              <span className='lg:ml-2 text-lg font-semibold text-[#FF1700] p-1 lg:p-0 lg:inline block mb-3'>*{isError.imageError}</span>
              <span className='text-lg block lowercase'>{imageFile.name}</span>
              <input ref={fileUploadRef} type='file' style={{display:'none'}} accept='image/png,image/jpeg,image/jpg'/>
            </div>
            <div className='pt-2  sm:float-right'>
              <button disabled={loading} onClick={()=>{postData()}} className={`sm:rounded-full border-blue-600 border ${loading?'bg-[#E9E5D6] border-none':'hover:bg-[#548CFF] bg-blue-500 cursor-pointer hover:text-white'} w-full sm:w-[7rem] px-8 py-1 font-semibold`}>
                {loading?<span>{progress}</span>:'post'}
              </button>
            </div>
          </div>
        </div>

        <div onClick={()=>{setToggleModal(false)}} className='hover:text-[red] cursor-pointer absolute right-0 sm:p-2 p-2'>
          <ImCross/>
        </div>
        
      </div>
      </div>
    );
  }
export default Modal;