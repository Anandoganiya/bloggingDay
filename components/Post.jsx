import {useState,useEffect} from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {collection,setDoc,serverTimestamp, doc,updateDoc,getDoc} from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import {auth,db,firebaseStorage} from '../firebase/firebaseConfig'

const Post = ({setOpenPost,DisplayPost,isAuth}) => {
    const [post,setPost] = useState({});
    const [getComment,setComment] = useState('');
    const postCommentDocRef =  doc(db,'post',DisplayPost);

    const postComment = async () => {
        try{
            const docPost = await getDoc(postCommentDocRef)
            const postInfo = { 
                comments:[
                    ...docPost.data().comments,
                    {
                        comment:getComment,
                        createdAt: new Date().toString(),
                        userName:auth.currentUser.displayName,
                        userPhotoUrl:auth.currentUser.photoURL,
                    }
                ]
            }
            await updateDoc(postCommentDocRef,postInfo);
            const newPost = await getDoc(postCommentDocRef)
            setPost(newPost.data())
        }catch(err){
            console.log(err);
        }
        return;
    }
    
    useEffect(()=>{
        try{
            (async()=>{
                if(post){
                    const docPost = await getDoc(postCommentDocRef)
                    setPost(docPost.data())
                }
            })()
        }catch(err){
            console.log(err);
        }
    },[])

  return(
    <div className='sm:absolute mx-auto sm:left-[16rem] sm:w-[50%] w-[98%]'>
        <button onClick={()=>setOpenPost(false)} className='hover:text-white text-xl'><BiArrowBack/></button>
    <section>
      
                 <article className='bg-white rounded-2xl shadow-sm  transition-all duration-300 ease-in-out font-serif mb-4'>
                    <div className='w-full'>
                        <div className='w-full' >
                            <img src={post.featuredImageUrl} alt="post image" className='h-48 w-full object-cover rounded-2xl border-4 border-white xl:h-[30rem]'/>
                        </div>
                        <ul className='m-2'>
                            <li className='m-1 text-lg text-gray-600 font-semibold tracking-wide'>{post.category}</li>
                            <li className='text-gray-900 font-bold text-xl mb-2'>{post.title}</li>
                            <li className='text-gray-700 text-base'>{post.content}</li>
                            <li className='mt-1 mb-1 flex justify-center'><img src={post.author?.authorPhoto} className=' w-10 h-10 rounded-full mr-4' alt="author image" /></li>
                            <li className='flex justify-center'><p className='"text-gray-900 font-semibold font-sans'>{post.author?.name}</p></li>
                            <li className='flex justify-center pb-2'><p className='"text-gray-900 '>10:30 Aug 2022</p></li>
                        </ul> 
                    </div>
               </article>
            
        <article className='p-2 bg-white rounded-2xl  shadow-sm  transition-all duration-300 ease-in-out font-serif mb-4'>
            <h2 className='font-semibold xl:text-xl md:text-lg '>Comments</h2>

            {isAuth?<UserComment postComment={postComment} setComment={setComment} post={post}/>:null}
            {
                post?.comments?<Comments showComment={post?.comments}/>:null
            }
         </article>

    </section>
</div>
  )
};
export default Post;

const UserComment = ({post,setComment,postComment}) =>{
    return(
            <div className='mt-2'>
            <div className='w-full flex' >
                <img src={post.author?.authorPhoto} className=' w-10 h-10 rounded-full mr-4' alt="author image" />
                <p className='mr-2 font-semibold font-sans'>{post.author?.name}</p>
                <p>10:30 Aug 2022</p>
            </div>
            <div className='m-2 w-full '>
                <textarea onChange={(e)=>{setComment(e.target.value)}} className='border  border-gray outline-none max-w-full resize-none' placeholder='add a comment' name="" id="" cols='70'></textarea>
                <button onClick={()=>{postComment()}} className='bg-blue-300 rounded-full  outline-none block py-2 px-8 hover:bg-blue-600'>Send</button>
            </div>
            <hr />
        </div>
    );
}

const Comments = ({showComment}) =>{
    return (
       <>
       {
           showComment.map((postComments,index)=>{
               return(
                <div key={index} className='mt-2'>
                <div className='w-full flex' >
                    <img src={postComments.userPhotoUrl} className=' w-10 h-10 rounded-full mr-4' alt="author image" />
                    <p className='mr-2'>{postComments.userName}</p>
                    <p>10:30 Aug 2022</p>
                </div>
                <div className='m-2'>
                    {postComments.comment}
                </div>
                <hr />
            </div>
               );
           })
       }
       </>
    );
}