import { useState} from 'react';
import Modal from '../components/Modal'
import Header from '../components/Header';
import SearchBarMenu from '../components/SearchBarMenu';
import HomePosts from '../components/HomePosts';
import RelatedPostWidget from '../components/PostWidget';
import Post from '../components/Post';

const Home = () => {
  const [toggleModal,setToggleModal] = useState(false)
  return (
    <div className='relative'>
      <Header  setToggleModal={setToggleModal}/>
      <SearchBarMenu/>
      <Post></Post>
      {/* <HomePosts/> */}
      {toggleModal?<Modal setToggleModal={setToggleModal}/>:null}
      <RelatedPostWidget/>
    </div>
  )
}
export default Home;
