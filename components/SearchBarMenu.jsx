import {useState,useEffect} from 'react';
import {BsSearch} from 'react-icons/bs';
import {ImCancelCircle} from 'react-icons/im';
import {search_list} from '../styles/SearchBar.module.css';
import {collection,getDocs} from 'firebase/firestore'
import {db} from '../firebase/firebaseConfig'

const SearchBarMenu = ({selectedCategory,selectedAuthor}) => {
  const [cat,setCat] = useState([])
  const [searchInput,setSearch] = useState('');
  const [openList,setOpenList] = useState(false);
  const [authors,setAuthors] = useState([]);
  const [loading,setLoading] = useState(true)
  const authorRef = collection(db,'author');
  const categoryRef = collection(db,'category')

  const searchBox = (e) => {
    e.preventDefault();
    setOpenList(false)
    setSearch('')
  }

  useEffect(()=>{
    
    if(searchInput.length > 0){
      (async()=>{
        setLoading(true)
        const authors = await getDocs(authorRef)
        const categories = await getDocs(categoryRef)
        const allCat = categories.docs.map((doc)=>({...doc.data(),id:doc.id}))     
        const allAuthors = authors.docs.map((doc)=>({...doc.data(),id:doc.id}))     
        //filter for people
        const filterPeople = allAuthors.filter(val=>{
          if(val.displayName.toLowerCase().includes(searchInput.toLowerCase())){
            return val; 
          }
          return;
        })
        // filter for category
        const filterCat = allCat.filter(val=>{
          if(val.categoryName.toLowerCase().includes(searchInput.toLowerCase())){
            return val; 
          }
          return;
        })
        setAuthors(filterPeople)
        setCat(filterCat)
        
        setLoading(false)
      })()
      setOpenList(true)
    }
    if(searchInput.length === 0){
      setCat([])
      setAuthors([])
      setOpenList(false)
    }
  
  },[searchInput])
 
  return (
    <div className='w-full sm:p-5 p-1 font-sans flex justify-end'>
       <form action="#" method='GET' className='w-full'>
            <div className='w-full flex justify-end'>
                <input 
                onChange={(e)=>setSearch(e.target.value)}
                type="text" 
                autoComplete='off'
                aria-label='search'
                value={searchInput}
                className='p-[21px] h-[20px] w-[75%] sm:w-[50%] md:w-[60%] rounded-tl-[5px] rounded-bl-[5px] outline-none text-[#9DBFAF] focus:text-[#548CFF]'
                 placeholder="Search for category,author"/>
                <button type="submit" onClick={(e)=>searchBox(e)} className='w-[45px] pl-[11px] rounded-tr-[10px] rounded-br-[10px] text-[1.3rem] bg-[#548CFF] text-white cursor-pointer transition-all duration-300'>
                    {openList?<ImCancelCircle/>:<BsSearch/>}
                </button>
            </div>
       </form>
       <div className={`${search_list} ${openList?'block':'hidden'} rounded shadow md:w-[58%] sm:w-[47%] w-[100%]  border absolute sm:top-[4rem] top-[3rem] sm:right-[4rem] right-[0] z-[2] bg-white`}>
          <ul className='m-[.3rem] xl:text-xl md:text-lg sm:text-sm font-sans'>
              <div className=' ml-[5px] p-[5px]  border-gray border-b-[1px] pb-2'>
              <p className='font-semibold'>Category</p>
              </div>
          {loading?<p className='ml-[5px] p-[5px]'>loading...</p>:
            cat.map(catName=>{
              return(
                <div key={catName.id} onClick={()=>{selectedCategory(catName.id);setOpenList(false);setSearch('')}}>
                  <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">{catName.categoryName}</a></li>
                </div>
              );
            })
              }
          </ul>

          <ul className='m-[.3rem] xl:text-xl md:text-lg sm:text-sm font-sans'>
              <div className=' ml-[5px] p-[5px] border-gray border-b-[1px] pb-2'>
                <p className='font-semibold'>People</p>
              </div>
              {loading?<p className='ml-[5px] p-[5px]'>loading...</p>:
                authors.map(auto=>{
                  return(
                    <div key={auto.userId} onClick={()=>{selectedAuthor(auto.userId);setOpenList(false);setSearch('')}}>
                      <li className=' ml-[5px] p-[5px] hover:font-semibold'><a className='block' href="#">{auto.displayName}</a></li>
                    </div>
                  );
                })}
          </ul>
      </div>
    </div>
  );
};

export default SearchBarMenu;
