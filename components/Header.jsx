import {useState,useRef,useEffect} from 'react';
import Link from 'next/link'
import {categoriesMenu,sideMenuIconsStyles,category,handburgerMenu,top_line,middle_line,bottom_line,
rotate_top,rotate_bottom,hide_line,sideMenu,profile_info,show} from '../styles/Header.module.css';
import {AiOutlineHome} from 'react-icons/ai';
import {MdOutlineEmojiFoodBeverage} from 'react-icons/md';
import {BsCircle} from 'react-icons/bs';
import {FaPencilAlt} from 'react-icons/fa'
import {AiOutlineLogout} from 'react-icons/ai' 
import {SiStylelint} from 'react-icons/si'
import { IconContext } from "react-icons";
import {imgUrl} from '../public/index';

const Header = ({setToggleModal}) => {
    const [toggle,setToggle] = useState(false);
    const sideMenuRef = useRef()
    const toggleHamburgerMenu = () => {
        setToggle(!toggle);
        const sideMenu = sideMenuRef.current;
        sideMenu.classList.toggle(`${show}`);
    }

    useEffect(() => {
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
            <SideBarMenu sideMenuRef={sideMenuRef} setToggleModal={setToggleModal}/>
        </>
       
    )
}

const SideBarMenu = ({sideMenuRef,setToggleModal}) => {
    return (
        // w-60 = 15rem 
        <div ref={sideMenuRef} className={`${sideMenu} z-[3] sm:z-0 font-sans fixed shadow-2xl rounded-r-2xl w-60 h-screen bg-[#FAEEE7]`}>
                
            <div className={`p-[1rem] ${profile_info}`}>
                <div className='flex justify-between items-center'>
                    <img className="w-14 h-14 border-2 border-black rounded-full" src={imgUrl} alt="profile Image" />
                    <div className='text-[2rem] hover:text-[#548CFF] cursor-pointer'><Link href='/'><a><AiOutlineLogout/></a></Link></div>
                </div>
                <div className='pl-[.5rem] pt-[.2rem] text-lg'>
                <div className='font-bold'>
                    Sami Matty
                </div>
                <div className='text-sm font-semibold'>
                    Feb 20,2022
                </div>
                <div className='text-sm'>
                    11:34 am
                </div>
                </div>
            
            </div>
            <div className='text-lg'>
                    <ul className={`h-[29rem] overflow-y-auto ${categoriesMenu}`}>
                            <li className='hover:cursor-pointer text-center mb-2'><button onClick={()=>{setToggleModal(true)}} className='border  border-blue-600 font-sans text-lg font-semibold px-8 py-2 transition-all duration-100 rounded-full hover:bg-[#548CFF] hover:text-white'><FaPencilAlt className='inline mr-1'/> Create Post</button></li>
                        <IconContext.Provider value={{size:'2.5rem',className:`${sideMenuIconsStyles}` }}>
                            <li className='hover:cursor-pointer font-semibold'><AiOutlineHome className={`m-[1rem] ${category}`}/>Home</li>
                            <li className='hover:cursor-pointer font-semibold'><BsCircle className={`m-[1rem] ${category}`}/>International</li>
                            <li className='hover:cursor-pointer font-semibold'><SiStylelint className={`m-[1rem] ${category}`}/>Lifestyle</li>
                            <li className='hover:cursor-pointer font-semibold'><MdOutlineEmojiFoodBeverage className={`m-[1rem] ${category}`}/>Food</li>
                            <li className='hover:cursor-pointer font-semibold'><AiOutlineHome className={`m-[1rem] ${category}`}/>Home</li>
                            <li className='hover:cursor-pointer font-semibold'><BsCircle className={`m-[1rem] ${category}`}/>International</li>
                            <li className='hover:cursor-pointer font-semibold'><SiStylelint className={`m-[1rem] ${category}`}/>Lifestyle</li>
                            <li className='hover:cursor-pointer font-semibold'><MdOutlineEmojiFoodBeverage className={`m-[1rem] ${category}`}/>Food</li>
                        </IconContext.Provider>
                    </ul>
            </div>
        </div>
    );
}

export default Header;
