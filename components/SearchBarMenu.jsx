import {useState,useEffect} from 'react';
import {BsSearch} from 'react-icons/bs';
import {ImCancelCircle} from 'react-icons/im';
import {search_list} from '../styles/SearchBar.module.css';
import {collection} from 'firebase/firestore'
import {db} from '../firebase/firebaseConfig'

const SearchBarMenu = ({showCategories}) => {
  const [SearchInput,setSearch] = useState('');
  const [openList,setOpenList] = useState(false);
  const searchBox = (e) => {
    e.preventDefault();
    setOpenList(false)
  }

  // useEffect(()=>{
  //  try{
  //   const
  //  }catch{

  //  }
    
  // },[SearchInput])
 
  return (
    <div className='w-full sm:p-5 p-1 font-sans flex justify-end'>
       <form action="#" method='GET' className='w-full'>
            <div className='w-full flex justify-end'>
                <input 
                onChange={(e)=>setSearch(e.target.value)}
                type="text" 
                onFocus={()=>{setOpenList(true)}}
                autoComplete='off'
                aria-label='search'
                className='p-[21px] h-[20px] w-[75%] sm:w-[50%] md:w-[60%] rounded-tl-[5px] rounded-bl-[5px] outline-none text-[#9DBFAF] focus:text-[#548CFF]' placeholder="Search"/>
                <button type="submit" onClick={(e)=>searchBox(e)} className='w-[45px] pl-[11px] rounded-tr-[10px] rounded-br-[10px] text-[1.3rem] bg-[#548CFF] text-white cursor-pointer transition-all duration-300'>
                    {openList?<ImCancelCircle/>:<BsSearch/>}
                </button>
            </div>
       </form>
       <div className={`${search_list} ${openList?'block':'hidden'} rounded shadow md:w-[58%] sm:w-[47%] w-[100%]  border absolute sm:top-[4rem] top-[3rem] sm:right-[4rem] right-[0] z-[2] bg-white`}>
          <ul className='m-[.3rem] xl:text-xl md:text-lg sm:text-sm font-sans'>
              <div className=' ml-[5px] p-[5px'>
                <p>category</p>
              </div>
          {showCategories.map(cat=>{
                  return(
                    <div>
                      <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">{cat.categoryName}</a></li>
                    </div>
                  );
                })}
          </ul>

          <ul className='m-[.3rem] xl:text-xl md:text-lg sm:text-sm font-sans'>
              <div className=' ml-[5px] p-[5px'>
                <p>people</p>
              </div>
              {showCategories.map(cat=>{
                  return(
                    <div>
                      <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">{cat.categoryName}</a></li>
                    </div>
                  );
                })}
          </ul>
      </div>
    </div>
  );
};

export default SearchBarMenu;
