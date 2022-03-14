import {useEffect,useState} from 'react';
import {AiFillDelete} from 'react-icons/ai'
import moment from 'moment'
import {collection,onSnapshot,query,where,orderBy,limit,deleteDoc,doc} from 'firebase/firestore'
import {db,auth} from '../firebase/firebaseConfig'

const HomePosts = ({setPost,postId,authorId,isAuth}) => {
    const [posts,setShowPost] = useState([]);
    const [loading,setLoading] = useState(false)
    const [deletePostId,setDeletePostId] = useState(null)
    
    useEffect(()=>{
        if(deletePostId){
            (async()=>{
                const docRef = doc(db,'post',deletePostId)
                await deleteDoc(docRef)
            })();
            setDeletePostId(null)
            setShowPost([])
        }
        
        if(postId){
            setLoading(true)
            setShowPost([])
            const postCollectionRef = query(collection(db,'post'),orderBy('createdAt','desc'),limit(10),where('categoryId','==',postId));
            let updatedPosts = []
             const unsubscribe = onSnapshot(postCollectionRef,(snap)=>{
                snap.forEach(doc=>{
                    updatedPosts.push({...doc.data(),id:doc.id})
                })
                setShowPost(updatedPosts);
            })
            setLoading(false)
            return ()=>{
                unsubscribe()
            }
        }
        else if(authorId){
            setLoading(true)
            setShowPost([])
            const postCollectionRef = query(collection(db,'post'),orderBy('createdAt','desc'),limit(10),where('author.id','==',authorId));
            let updatedPosts = []
             const unsubscribe = onSnapshot(postCollectionRef,(snap)=>{
                snap.forEach(doc=>{
                    updatedPosts.push({...doc.data(),id:doc.id})
                })
                setShowPost(updatedPosts);
            })
            setLoading(false)
            return ()=>{
                unsubscribe()
            }
        }else{
            setLoading(true)
            setShowPost([])
            const postCollectionRef = query(collection(db,'post'),orderBy('createdAt','desc'),limit(10))
            let updatedPosts = []
             const unsubscribe = onSnapshot(postCollectionRef,(snap)=>{
                snap.forEach(doc=>{
                    updatedPosts.push({...doc.data(),id:doc.id})
                })
                setShowPost(updatedPosts);
            })
            setLoading(false)
            return ()=>{
                unsubscribe()
          }
        }
        
    },[postId,authorId,deletePostId])
    
  return (
      <div className='sm:absolute mx-auto sm:left-[16rem] sm:w-[50%] w-[98%]'>
          <section>
        {
           loading ?
           <div className='w-full flex justify-center items-center h-[30rem]'>
            <img className='w-[4rem] h-[4rem]' src="loading.gif" />
           </div>
           : posts.length > 0 ?
                posts.map((post)=>{
                    return(
                        <article key={post.id}  className=' lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm  transition-all duration-300 ease-in-out font-serif mb-4'>
                        {isAuth && post.author.id === auth.currentUser.uid && <div className='flex justify-end w-full  absolute p-4 text-[red]'>
                                <span className='cursor-pointer'  onClick={()=>setDeletePostId(post.id)}>
                                    <AiFillDelete/>
                                </span>
                            </div> }
                            <div className='xl:flex cursor-pointer' onClick={()=>{setPost(post.id)}}>
                                <div className='md:shrink-0'>
                                    <img src={post.featuredImageUrl} alt="post image" className='h-48 w-full object-cover rounded-2xl border-4 border-white xl:h-full xl:w-48'/>
                                </div>
                                <ul className='m-2'>
                                    <li className='m-1 text-lg text-gray-600 font-semibold tracking-wide'>{post.category}</li>
                                    <li className='text-gray-900 font-bold text-xl mb-2'>{post.title}</li>
                                    <li className='text-gray-700 text-base'>{post.content}</li>
                                    <li className='mt-1 mb-1'><img src={post.author.authorPhoto} className='w-10 h-10 rounded-full mr-4' alt="author image" /></li>
                                    <li><p className='"text-gray-900 font-semibold font-sans'>{post.author.name}</p></li>
                                    <li><p className='"text-gray-900'>{moment.utc(post.createdAt?.seconds*1000).format('LL')}</p></li>
                                </ul>
                            </div>
                        </article>
                    );
            })
           :<h1 className='text-center font-bold text-xl'>No Result</h1>
        }

          
          </section>
      </div>
  );
};

export default HomePosts;

 //    } else if(index > getIndex && !flag?true:false){
            //        flag = true;
            //        return(
            //         <section className='justify-evenly w-full lg:flex hidden'>
            //         <article onClick={()=>{setOpenPost(true)}} className='max-w-sm w-[23rem] m-1 lg:max-w-full lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out font-serif mb-4'>
            //             <div className='flex'>
            //                 <div className='w-full'>
            //                     <img src={post.featuredImageUrl} alt="post image" className='h-[10rem] w-[10rem] object-cover rounded-2xl border-4 border-white'/>
            //                 </div>
            //                 <ul className='m-2'>
            //                     <li className='text-gray-900 font-bold text-lg '>{post.title}</li>
            //                 </ul>
            //             </div>
            //         </article>
    
            //         <article onClick={()=>{setOpenPost(true)}} className='max-w-sm w-[23rem] m-1 lg:max-w-full lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out font-serif mb-4'>
            //             <div className='flex'>
            //                 <div className='w-full'>
            //                     <img src={post.featuredImageUrl} alt="post image" className='h-[10rem] w-[10rem] object-cover rounded-2xl border-4 border-white'/>
            //                 </div>
            //                 <ul className='m-2'>
            //                     <li className='text-gray-900 font-bold text-lg '>{post.title}</li>
            //                 </ul>
            //             </div>
            //         </article>
                    
            //     </section>
            //        );
            //    }else{
            //     return(
            //         <article key={post.id}  className=' lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm  transition-all duration-300 ease-in-out font-serif mb-4'>
            //            {isAuth && post.author.id === auth.currentUser.uid && <div className='flex justify-end w-full  absolute p-4 text-[red]'>
            //                 <span className='cursor-pointer'  onClick={()=>setDeletePostId(post.id)}>
            //                     <AiFillDelete/>
            //                 </span>
            //             </div> }
            //             <div className='xl:flex cursor-pointer' onClick={()=>{setPost(post.id)}}>
            //                 <div className='md:shrink-0'>
            //                     <img src={post.featuredImageUrl} alt="post image" className='h-48 w-full object-cover rounded-2xl border-4 border-white xl:h-full xl:w-48'/>
            //                 </div>
            //                 <ul className='m-2'>
            //                     <li className='m-1 text-lg text-gray-600 font-semibold tracking-wide'>{post.category}</li>
            //                     <li className='text-gray-900 font-bold text-xl mb-2'>{post.title}</li>
            //                     <li className='text-gray-700 text-base'>{post.content}</li>
            //                     <li className='mt-1 mb-1'><img src={post.author.authorPhoto} className='w-10 h-10 rounded-full mr-4' alt="author image" /></li>
            //                     <li><p className='"text-gray-900 font-semibold font-sans'>{post.author.name}</p></li>
            //                     <li><p className='"text-gray-900'>{moment.utc(post.createdAt?.seconds*1000).format('LL')}</p></li>
            //                 </ul>
            //             </div>
            //         </article>
            //     );
            //    }




  {/* <article onClick={()=>{setOpenPost(true)}} className=' lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out font-serif mb-4'>
                <div className='xl:flex'>
                    <div className='md:shrink-0'>
                        <img src={imgMountain} alt="post image" className='h-48 w-full object-cover rounded-2xl border-4 border-white xl:h-full xl:w-48'/>
                    </div>
                    <ul className='m-2'>
                        <li className='m-1 text-lg text-gray-600 font-semibold tracking-wide'>Lifestyle</li>
                        <li className='text-gray-900 font-bold text-xl mb-2'>{post.title}</li>
                        <li className='text-gray-700 text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint dolor maiores sunt, quasi impedit nobis unde adipisci ipsam esse soluta!</li>
                        <li className='mt-1 mb-1'><img src={imgMountain} className='w-10 h-10 rounded-full mr-4' alt="author image" /></li>
                        <li><p className='"text-gray-900 font-semibold font-sans'>Jimmy Shelby</p></li>
                        <li><p className='"text-gray-900 '>10:30 Aug 2022</p></li>
                    </ul>
                </div>
            </article> */}

         

            {/* <article onClick={()=>{setOpenPost(true)}} className=' lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out font-serif mb-4'>
                <div className='xl:flex'>
                    <div className='md:shrink-0'>
                        <img src={imgMountain} alt="post image" className='h-48 w-full object-cover rounded-2xl border-4 border-white xl:h-full xl:w-48'/>
                    </div>
                    <ul className='m-2'>
                        <li className='m-1 text-lg text-gray-600 font-semibold tracking-wide'>Lifestyle</li>
                        <li className='text-gray-900 font-bold text-xl mb-2'>Can coffee make you a better developer?</li>
                        <li className='text-gray-700 text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint dolor maiores sunt, quasi impedit nobis unde adipisci ipsam esse soluta!</li>
                        <li className='mt-1 mb-1'><img src={imgMountain} className='w-10 h-10 rounded-full mr-4' alt="author image" /></li>
                        <li><p className='"text-gray-900 font-semibold font-sans'>Jimmy Shelby</p></li>
                        <li><p className='"text-gray-900 '>10:30 Aug 2022</p></li>
                    </ul>
                </div>
            </article> */}
               
            