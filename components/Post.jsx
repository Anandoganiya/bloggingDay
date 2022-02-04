import {imgMountain} from '../public/index';
const Post = () => {
  return(
    <div className='sm:absolute mx-auto sm:left-[16rem] sm:w-[50%] w-[98%]'>
    <section>
        
      <article className='bg-white rounded-2xl shadow-sm  transition-all duration-300 ease-in-out font-serif mb-4'>
          <div className='w-full'>
              <div className='w-full' >
                  <img src={imgMountain} alt="post image" className='h-48 w-full object-cover rounded-2xl border-4 border-white xl:h-full'/>
              </div>
              <ul className='m-2'>
                  <li className='m-1 text-lg text-gray-600 font-semibold tracking-wide'>Lifestyle</li>
                  <li className='text-gray-900 font-bold text-xl mb-2'>Can coffee make you a better developer?</li>
                  <li className='text-gray-700 text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint dolor maiores sunt, quasi impedit nobis unde adipisci ipsam esse soluta!</li>
                  <li className='mt-1 mb-1 flex justify-center'><img src={imgMountain} className=' w-10 h-10 rounded-full mr-4' alt="author image" /></li>
                  <li className='flex justify-center'><p className='"text-gray-900 font-semibold font-sans'>Jimmy Shelby</p></li>
                  <li className='flex justify-center pb-2'><p className='"text-gray-900 '>10:30 Aug 2022</p></li>
              </ul>
          </div>
      </article>

      <article className='p-2 bg-white rounded-2xl  shadow-sm  transition-all duration-300 ease-in-out font-serif mb-4'>
        <h2 className='font-semibold xl:text-xl md:text-lg '>Comments</h2>
        <div className='mt-2'>
            <div className='w-full flex' >
                <img src={imgMountain} className=' w-10 h-10 rounded-full mr-4' alt="author image" />
                <p className='mr-2 font-semibold font-sans'>Jimmy Shelby</p>
                <p>10:30 Aug 2022</p>
            </div>
            <div className='m-2 w-full '>
                <textarea className='border  border-gray outline-none max-w-full resize-none' placeholder='add a comment' name="" id="" cols='70'></textarea>
                <button className='bg-blue-300 rounded-full  outline-none block py-2 px-8 hover:bg-blue-600'>Send</button>
            </div>
            <hr />
        </div>
        <div className='mt-2'>
            <div className='w-full flex' >
                <img src={imgMountain} className=' w-10 h-10 rounded-full mr-4' alt="author image" />
                <p className='mr-2'>Jimmy Shelby</p>
                <p>10:30 Aug 2022</p>
            </div>
            <div className='m-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam enim rem quae dignissimos adipisci atque, aspernatur eligendi ex veritatis minus!
            </div>
            <hr />
        </div>
        <div className='mt-2'>
            <div className='w-full flex' >
                <img src={imgMountain} className=' w-10 h-10 rounded-full mr-4' alt="author image" />
                <p className='mr-2'>Jimmy Shelby</p>
                <p>10:30 Aug 2022</p>
            </div>
            <div className='m-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam enim rem quae dignissimos adipisci atque, aspernatur eligendi ex veritatis minus!
            </div>
            <hr />
        </div>
        <div className='mt-2'>
            <div className='w-full flex' >
                <img src={imgMountain} className=' w-10 h-10 rounded-full mr-4' alt="author image" />
                <p className='mr-2'>Jimmy Shelby</p>
                <p>10:30 Aug 2022</p>
            </div>
            <div className='m-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam enim rem quae dignissimos adipisci atque, aspernatur eligendi ex veritatis minus!
            </div>
            <hr />
        </div>
        <div className='mt-2'>
            <div className='w-full flex' >
                <img src={imgMountain} className=' w-10 h-10 rounded-full mr-4' alt="author image" />
                <p className='mr-2'>Jimmy Shelby</p>
                <p>10:30 Aug 2022</p>
            </div>
            <div className='m-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam enim rem quae dignissimos adipisci atque, aspernatur eligendi ex veritatis minus!
            </div>
            <hr />
        </div>
      </article>



    </section>
</div>
  )
};

export default Post;
