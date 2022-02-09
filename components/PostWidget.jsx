import {imgMountain} from '../public/index';
import {relatedPostHide} from '../styles/RelatedPostStyles.module.css'
const RelatedPostWidget = ({openPost,setOpenPost}) => {
  return (
    <div className={`${relatedPostHide} absolute right-[1rem] top-[5.125rem] p-[1rem] lg:w-[19rem] xl:w-[22rem] shadow-2xl bg-white rounded-2xl`}>
        <p className='mb-[1rem] font-sans font-bold tracking-wide text-lg'>{openPost?'Recent Post':'Related Post'}</p>
        <div className='font-serif'>
            <ul className=''>

                <li onClick={()=>setOpenPost(true)} className='flex mb-[1rem] cursor-pointer hover:bg-blue-200 '>
                    <img src={imgMountain} className='h-10 w-10 rounded-full' alt="related post image" />
                    <div className='ml-[.5rem]'>
                        <p className='text-gray-600 font-semibold'>10:30 Aug 2022</p>
                        <p className='font-bold'>Can coffee make you a better developer?</p>
                    </div>
                </li>
                <li onClick={()=>setOpenPost(true)} className='flex mb-[1rem] cursor-pointer hover:bg-blue-200 '>
                    <img src={imgMountain} className='h-10 w-10 rounded-full' alt="related post image" />
                    <div className='ml-[.5rem]'>
                        <p className='text-gray-600 font-semibold'>10:30 Aug 2022</p>
                        <p className='font-bold'>Can coffee make you a better developer?</p>
                    </div>
                </li>
                <li onClick={()=>setOpenPost(true)} className='flex mb-[1rem] cursor-pointer hover:bg-blue-200 '>
                    <img src={imgMountain} className='h-10 w-10 rounded-full' alt="related post image" />
                    <div className='ml-[.5rem]'>
                        <p className='text-gray-600 font-semibold'>10:30 Aug 2022</p>
                        <p className='font-bold'>Can coffee make you a better developer?</p>
                    </div>
                </li>
                <li onClick={()=>setOpenPost(true)} className='flex mb-[1rem] cursor-pointer hover:bg-blue-200 '>
                    <img src={imgMountain} className='h-10 w-10 rounded-full' alt="related post image" />
                    <div className='ml-[.5rem]'>
                        <p className='text-gray-600 font-semibold'>10:30 Aug 2022</p>
                        <p className='font-bold'>Can coffee make you a better developer?</p>
                    </div>
                </li>
                
             
               
            </ul>
        </div>
    </div>
  );
};

export default RelatedPostWidget;
