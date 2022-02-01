import {useState,useRef,useEffect} from 'react';
import {modal_container} from '../styles/Modal.module.css'
import {ImCross} from 'react-icons/im';
import {AiOutlineCamera} from 'react-icons/ai';
const Modal = ({setToggleModal}) => {
  const [isError,setIsError] = useState({
    titleError:'',
    descriptionError:'',
    categoryError:'',
  })
  const titleRef = useRef(null);
  const descRef =  useRef(null);
  const [onDesc,setOnDesc] = useState('');
  const categoryRef =  useRef(null);
  const fileUploadRef = useRef(null);
  const [imageFile,setImageFile] = useState(null);
  const handleUpload = () => {
    fileUploadRef.current.click();
    fileUploadRef.current.addEventListener('change',(e)=>{ 
      setImageFile(e.target.files[0]);
    })
    return;
  }
     
  useEffect(()=>{
    if(imageFile){
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src',URL.createObjectURL(imageFile));
      imageElement.style.width = '50%';
      imageElement.style.height = '50%';
      descRef.current.appendChild(imageElement);
    }
  },[imageFile])

  const validate = () => {
    const title =   titleRef.current.innerText;
    const desc =  descRef.current.innerText;
    const category =  categoryRef.current.value; 
    const modalError = {
      titleErr:'',
      descErr:'',
      categoryErr:''
    };
    if(!title){
      modalError.titleErr = 'title is required';
    }
    if(!desc){
      modalError.descErr = 'description is required';
    }
    if(!category){
      modalError.categoryErr = 'category is required';
    }
    const {categoryErr,titleErr,descErr} = modalError;
    setIsError({...isError,titleError:titleErr,descriptionError:descErr,categoryError:categoryErr});
    return;
  }
    
    
  return (
      <div className={`${modal_container}`}>
      <div className={`absolute top-[-10%] md:w-1/2 w-full rounded-lg  shadow-2xl drop-shadow-2xl p-1 z-[100] bg-white mt-[10rem] font-sans flex justify-center`}>
        {/* title */}
        <div className='w-full sm:m-5 p-2'>
          <div className=' w-full'>
            <p className='font-semibold text-lg'>Title <span className='lg:ml-2 text-lg font-semibold text-[#FF1700] p-1 lg:p-0 lg:inline block'>*{isError.titleError}</span></p>
            <div contentEditable='true' ref={titleRef} aria-label='post title' className='bg-white outline-none leading-[20px] min-h-[42px] w-full cursor-auto'>
            </div>
          </div>
          {/* description */}
          <div className='w-full'>
            <p className='font-semibold text-lg'>Description <span className='lg:ml-2 text-lg font-semibold text-[#FF1700] p-1 lg:p-0 lg:inline block'>*{isError.descriptionError}</span></p>
            <div contentEditable='true' ref={descRef} aria-label='post body' className='bg-white h-[10rem] overflow-y-scroll outline-none leading-[20px]  min-h-[80px] w-full cursor-auto'>
            </div>
            <div className='text-lg font-semibold'>
              <select ref={categoryRef} id="category" className='ouline-none  outline-none cursor-pointer'>
                <option value="">category</option>
                <option value="internatioanl">internatioanl</option>
                <option value="architechture">architechture</option>
                <option value="liftstyle">liftstyle</option>
                <option value="nature">nature</option>
              </select>
              <span className='lg:ml-2 text-lg font-semibold text-[#FF1700] p-1 lg:p-0 lg:inline block mb-3'>*{isError.categoryError}</span>
            </div>
            <div className='p-1 inline-block text-2xl'>
              <button className='cursor-pointer hover:text-gray-500' onClick={()=>{handleUpload()}}><AiOutlineCamera/></button>
              <input ref={fileUploadRef} type='file' style={{display:'none'}} accept='image/png,image/jpeg,image/jpg'/>
            </div>
            <div className='pt-2 cursor-pointer hover:text-white sm:float-right'>
              <button onClick={()=>validate()} className='sm:rounded-full border-blue-600 border hover:bg-[#548CFF] bg-blue-500 cursor-pointer w-full sm:w-[7rem] px-8 py-1 font-semibold'>Post</button>
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