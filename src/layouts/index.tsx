import React from 'react'
import Header from '../pages/header'
import Footer from '../pages/footer'


const Layouts = ({main}:any) => {
  return (
    <div className='layout'>
        <Header/>
        <div className='container'>
            {main}

        </div>
        <Footer/>
    </div>
  )
}

export default Layouts