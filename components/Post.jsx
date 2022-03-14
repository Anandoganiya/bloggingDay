import {useState,useEffect} from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {collection,doc,updateDoc,getDoc, getDocs} from 'firebase/firestore'
import {auth,db} from '../firebase/firebaseConfig';
import moment from 'moment'

const Post = ({setOpenPost,DisplayPostId,isAuth,user}) => {
    const [post,setPost] = useState({});
    const [getComment,setComment] = useState('');
    const postCommentDocRef =  doc(db,'post',DisplayPostId);
    const authorCollectionRef = collection(db,'author');
    const [loading,setLoading] = useState(false);
    const [loading2,setLoading2] = useState(false);
    const [date,setDate] = useState(0)

    const postComment = async () => {
        try{
            setLoading2(true)
            const docPost = await getDoc(postCommentDocRef)
            const authors = await getDocs(authorCollectionRef)
            const allAuthors = authors.docs.map(doc=>({...doc.data(),id:doc.id}));
            const author = allAuthors.find(auto=>(auto.userId === auth.currentUser.uid));
            const postInfo = { 
                comments:[
                    ...docPost.data().comments,
                    {
                        comment:getComment,
                        createdAt: new Date().toString(),
                        userName:author.displayName,
                        userPhotoUrl:author.photoUrl,
                    }
                ]
            }
            await updateDoc(postCommentDocRef,postInfo);
            const newPost = await getDoc(postCommentDocRef)
            setPost(newPost.data())
            setComment('')
            setLoading2(false)
        }catch(err){
            console.log(err);
        }
        return;
    }
    
    useEffect(()=>{
        try{
            (async()=>{
                if(post){
                    setLoading(true)
                    const docRef = doc(db,'post',DisplayPostId)
                    const docPost = await getDoc(docRef)
                    setPost(docPost.data())
                    setLoading(false)
                }
            })()
        }catch(err){
            console.log(err);
        }
    },[DisplayPostId])

  return(
    <div className='sm:absolute mx-auto sm:left-[16rem] sm:w-[50%] w-[98%]'>
        <button onClick={()=>setOpenPost(false)} className='hover:text-white text-xl'><BiArrowBack/></button>
        {
            loading?
            <div className='w-full flex justify-center items-center h-[30rem]'>
                <img className='w-[4rem] h-[4rem]' src="loading.gif" />
            </div>
            :
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
                       <li className='flex justify-center pb-2'><p className='"text-gray-900 '>{moment.utc(date*1000).format('LL')}</p></li>
                   </ul> 
               </div>
          </article>
       
   <article className='p-2 bg-white rounded-2xl  shadow-sm  transition-all duration-300 ease-in-out font-serif mb-4'>
       <h2 className='font-semibold xl:text-xl md:text-lg '>Comments</h2>

       {isAuth?<UserComment postComment={postComment} 
       getComment={getComment}
       user={user}
       loading2={loading2}
       setComment={setComment}
       post={post}/>:null}
       {
           post?.comments?<Comments showComment={post?.comments}/>:null
       }
    </article>

</section>
        }
</div>
  )
};
export default Post;

const UserComment = ({post,setComment,postComment,loading2,user,getComment}) =>{
    return(
            <div className='mt-2'>
            <div className='w-full flex' >
                <img src={user?.photoURL} className=' w-10 h-10 rounded-full mr-4' alt="author image" />
                <p className='mr-2 font-semibold font-sans'>{user?.displayName}</p>
                <p>{new Date().toString().slice(0,15)}</p>
            </div>
            <div className='m-2 w-full '>
                <textarea value={getComment} onChange={(e)=>{setComment(e.target.value)}} className='border  border-gray outline-none max-w-full resize-none' placeholder='add a comment' name="" id="" cols='70'></textarea>
                <button onClick={()=>{postComment()}} className='bg-blue-300 rounded-full  outline-none block py-2 px-8 hover:bg-blue-600'>{loading2?'loading...':'Send'}</button>
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
                    <p>{postComments.createdAt.toString().slice(0,15)}</p>
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