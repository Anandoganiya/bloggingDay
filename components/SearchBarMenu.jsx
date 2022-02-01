import {useState} from 'react';
import {BsSearch} from 'react-icons/bs';
import {ImCancelCircle} from 'react-icons/im';
import {search_list} from '../styles/SearchBar.module.css';
const SearchBarMenu = () => {
  const [openList,setOpenList] = useState(false);
  const searchBox = (e) => {
    e.preventDefault();
    setOpenList(false)
  }
 
  return (
    <div className='w-full sm:p-5 p-1 font-sans flex justify-end'>
       <form action="#" method='GET' className='w-full'>
            <div className='w-full flex justify-end'>
                <input type="text" onFocus={()=>{setOpenList(true)}} autoComplete='off' aria-label='search' className='p-[21px] h-[20px] w-[75%] sm:w-[50%] md:w-[60%] rounded-tl-[5px] rounded-bl-[5px] outline-none text-[#9DBFAF] focus:text-[#548CFF]' placeholder="Search"/>
                <button type="submit" onClick={(e)=>searchBox(e)} className='w-[45px] pl-[11px] rounded-tr-[10px] rounded-br-[10px] text-[1.3rem] bg-[#548CFF] text-white cursor-pointer transition-all duration-300'>
                    {openList?<ImCancelCircle/>:<BsSearch/>}
                </button>
            </div>
       </form>
       <div className={`${search_list} ${openList?'block':'hidden'} rounded shadow md:w-[58%] sm:w-[47%] w-[100%]  border absolute sm:top-[4rem] top-[3rem] sm:right-[4rem] right-[0] z-[2] bg-white`}>
          <ul className='m-[.3rem] xl:text-xl md:text-lg sm:text-sm font-sans'>
            <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">vandana kanjia</a></li>
            <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">ritika kanjia</a></li>
            <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">ruppa kanjia</a></li>
            <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">varun kanjia</a></li>
            <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">vikram kanjia</a></li>
          </ul>
      </div>
    </div>
  );
};

export default SearchBarMenu;
