import React from 'react';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <section className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </section>
  )
}

export default Home
