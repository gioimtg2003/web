import React from 'react'
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";  // Përdorni ../ për të kaluar një nivel lart

import AlbumItems from './AlbumItems';


const DisplayHome = () => {
  return (
    <>
    <Navbar />
    <div className='my-5 font-bold text-2x1'>
{albumsData.map((item,index)=>(<AlbumItems key={index} name={item.name} desc={item.desc} id={item.id} image ={item.image}/>))}
    </div>
    </>
  )
}
export default DisplayHome;