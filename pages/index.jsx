import { useState,useRef,useEffect } from 'react';
import Modal from '../components/Modal'
import Header from '../components/Header';
import SearchBarMenu from '../components/SearchBarMenu';
import HomePosts from '../components/HomePosts';
import RelatedPostWidget from '../components/RelatedPostWidget';

const Home = () => {
  const [toggleModal,setToggleModal] = useState(false)
  return (
    <div className='relative'>
      <Header  setToggleModal={setToggleModal}/>
      <SearchBarMenu/>
      <HomePosts/>
      {toggleModal?<Modal setToggleModal={setToggleModal}/>:null}
      <RelatedPostWidget/>
    </div>
  )
}
export default Home;
