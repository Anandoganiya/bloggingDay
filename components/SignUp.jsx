import {useState,useRef,useEffect} from 'react';
import {modal_container} from '../styles/Modal.module.css'
import {ImCross} from 'react-icons/im';

const SignUp = ({setIsSignUp,setIsLogIn}) => {
  const [logInEmail,setLogInEmail] = useState('')
  const [LogInPassword,setLogInPassword] = useState('')
  const [isError,setIsError] = useState({
    emailError:'',
    passwordError:'',
  })
  const validate = (e) => {
    e.preventDefault()
    const logInError = {
      emailErr:'',
      passwordErr:'',
    };
    if(!logInEmail){
      logInError.emailErr = 'email is required';
    }
    if(!LogInPassword){
      logInError.passwordErr = 'password is required';
    }
    const {emailErr,passwordErr} = logInError;
    setIsError({...isError,emailError:emailErr,passwordError:passwordErr});
    return;
  }
  return(
    <div className={`${modal_container}`}>
    <div className={`absolute top-[-10%] md:w-1/2 w-full rounded-lg  shadow-2xl drop-shadow-2xl p-1 z-[100] bg-white mt-[10rem] font-sans flex justify-center`}>
   
      <div className='w-full sm:m-5 p-2'>
        <form action="#" onSubmit={(e)=>{validate(e)}}>
            <div className='border-b-black border-b text-center font-bold text-lg'>SIGNUP</div>
           <div className='w-full sm:m-2 mt-2'>
                <label className='text-lg font-semibold'>
                    <div>Email <span className='text-red-300'>*{isError.emailError}</span></div> 
                   <input onClickCapture={(e)=>{setLogInEmail(e.target.value)}} className='border-b border-b-black  outline-none md:w-auto w-full ' type="email" placeholder='enter email' />
                </label>
           </div>
           <div className='w-full sm:m-2'>
                <label className='text-lg font-semibold'>
                    <div>Password <span className='text-red-300'>*{isError.passwordError}</span></div> 
                   <input onClickCapture={(e)=>{setLogInPassword(e.target.value)}} className='border-b border-b-black  outline-none md:w-auto w-full ' type="password" placeholder='enter password' />
                </label>
           </div>
            <button className='bg-blue-500 hover:bg-blue-600 md:rounded-full hover:text-white font-semibold shadow-xl px-8 py-2 text-center sm:m-2 mt-2 md:w-auto w-full'>SignUp</button>
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
