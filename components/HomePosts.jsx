import {useEffect,useState} from 'react';
// import {post} from '../styles/HomePostStyles.module.css'
import {imgMountain} from '../public/index';
import moment from 'moment';

const HomePosts = ({setOpenPost,showPosts,setPost}) => {
    const [posts,setShowPost] = useState([]);
    useEffect(()=>{
        setShowPost(showPosts);
    },[posts])
  return (
      <div className='sm:absolute mx-auto sm:left-[16rem] sm:w-[50%] w-[98%]'>
          <section>
        {
            posts.map(post=>{
                return(
                    <article key={post.id} onClick={()=>{setPost(post.id)}} className=' lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out font-serif mb-4'>
                        <div className='xl:flex'>
                            <div className='md:shrink-0'>
                                <img src={post.featuredImageUrl} alt="post image" className='h-48 w-full object-cover rounded-2xl border-4 border-white xl:h-full xl:w-48'/>
                            </div>
                            <ul className='m-2'>
                                <li className='m-1 text-lg text-gray-600 font-semibold tracking-wide'>{post.category}</li>
                                <li className='text-gray-900 font-bold text-xl mb-2'>{post.title}</li>
                                <li className='text-gray-700 text-base'>{post.content}</li>
                                <li className='mt-1 mb-1'><img src={post.author.authorPhoto} className='w-10 h-10 rounded-full mr-4' alt="author image" /></li>
                                <li><p className='"text-gray-900 font-semibold font-sans'>{post.author.name}</p></li>
                                <li><p className='"text-gray-900'>moment</p></li>
                            </ul>
                        </div>
                    </article>
                );
            })
        }

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
            </article>

            <section className='justify-evenly w-full lg:flex hidden'>
                <article onClick={()=>{setOpenPost(true)}} className='max-w-sm w-[23rem] m-1 lg:max-w-full lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out font-serif mb-4'>
                    <div className='flex'>
                        <div className='w-full'>
                            <img src={imgMountain} alt="post image" className='h-[10rem] w-[10rem] object-cover rounded-2xl border-4 border-white'/>
                        </div>
                        <ul className='m-2'>
                            <li className='text-gray-900 font-bold text-lg '>Can coffee make you a better developer?</li>
                        </ul>
                    </div>
                </article>

                <article onClick={()=>{setOpenPost(true)}} className='max-w-sm w-[23rem] m-1 lg:max-w-full lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out font-serif mb-4'>
                    <div className='flex'>
                        <div className='w-full'>
                            <img src={imgMountain} alt="post image" className='h-[10rem] w-[10rem] object-cover rounded-2xl border-4 border-white'/>
                        </div>
                        <ul className='m-2'>
                            <li className='text-gray-900 font-bold text-lg '>Can coffee make you a better developer?</li>
                        </ul>
                    </div>
                </article>
                
            </section>

            <article onClick={()=>{setOpenPost(true)}} className=' lg:flex bg-white rounded-2xl hover:shadow-2xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out font-serif mb-4'>
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
               
            
          </section>
      </div>
  );
};

export default HomePosts;

