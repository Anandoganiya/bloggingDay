import { useState, useEffect } from 'react';
import { modal_container } from '../styles/Modal.module.css'
import { ImCross } from 'react-icons/im';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

const LogIn = ({ setIsLogIn, setIsSignUp, setIsAuth }) => {
  const [logInEmail, setLogInEmail] = useState('')
  const [logInPassword, setLogInPassword] = useState('')
  const [isError, setIsError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authorInfo, setAuthorInfo] = useState({})

  const validate = (e) => {
    e.preventDefault()
    const logInError = {};

    if (!logInEmail) {
      logInError.emailErr = 'email is required';
    }
    if (!logInPassword) {
      logInError.passwordErr = 'password is required';
    }

    setIsError(logInError)
    setIsSubmit(true)
    return;
  }

  useEffect(() => {
    if (Object.keys(isError).length === 0 && isSubmit) {
      setLoading(true)
      signInWithEmailAndPassword(
        auth,
        logInEmail,
        logInPassword
      ).then(async cred => {
        setAuthorInfo({
          ...authorInfo,
          authorName: cred.user.displayName,
          authorProfileImage: cred.user.photoURL
        });
        localStorage.setItem('isAuth', true);
        setIsAuth(true)
        localStorage.setItem('authorName', cred.user.displayName)
        localStorage.setItem('authorProfileImage', cred.user.photoURL)
        setLoading(false)
        setIsLogIn(false)
      }).catch(error => {
        console.log(error);
        const errorMessage = error.message.slice(10)
        setIsError({
          ...isError,
          firebaseError: errorMessage,
        })
        setLoading(false)
      })
    }

  }, [isSubmit, isError])

  return (
    <div className={`${modal_container}`}>
      <div
        className={`absolute top-[-10%] md:w-1/2 w-full rounded-lg shadow-2xl drop-shadow-2xl
     p-1 z-[100] bg-white mt-[10rem] font-sans flex justify-center`}>

        <div className='w-full sm:m-5 p-2'>
          <form action="#" >
            <div className='border-b-black border-b text-center font-bold text-lg'>LOGIN</div>
            <div><span className='text-red-300 text-lg font-semibold'>{isError.firebaseError}</span></div>
            <div className='w-full sm:m-2 mt-2'>
              <label className='text-lg font-semibold'>
                <div>Email <span className='text-red-300'>*{isError.emailErr}</span></div>
                <input onChange={(e) => { setLogInEmail(e.target.value) }}
                  className='border-b border-b-black  outline-none md:w-auto w-full ' type="email" placeholder='enter email' />
              </label>
            </div>
            <div className='w-full sm:m-2'>
              <label className='text-lg font-semibold'>
                <div>Password <span className='text-red-300'>*{isError.passwordErr}</span></div>
                <input onChange={(e) => { setLogInPassword(e.target.value) }} className='border-b border-b-black  outline-none md:w-auto w-full ' type="password" placeholder='enter password' />
              </label>
            </div>
            {
              loading ? <div className='w-full sm:inline flex justify-center'><img height={40} width={40} src='spinner.gif'></img></div> :
                <button onClick={(e) => validate(e)}
                  className='bg-blue-500 hover:bg-blue-600 md:rounded-full hover:text-white font-semibold shadow-xl
              px-8 py-2 text-center sm:m-2 mt-2 md:w-auto w-full'>LogIn</button>
            }
            <p onClick={() => { setIsLogIn(false); setIsSignUp(true) }} className='sm:mt-auto mt-2'>
              Dont have an account
              <span className='hover:text-blue-500 cursor-pointer ml-2 text-blue-900 font-semibold'>sign-Up</span>
            </p>
          </form>
        </div>

        <div onClick={() => { setIsLogIn(false) }} className='hover:text-[red] cursor-pointer absolute right-0 sm:p-2 p-2'>
          <ImCross />
        </div>

      </div>
    </div>
  )
};

export default LogIn;
