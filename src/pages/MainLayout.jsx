import './Pages.css'
import { Outlet } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/pokemon.png'

const MainLayout = () => {
    const [userinfo, setUserinfo] = useState(
    localStorage.getItem("userinfo")
      ? JSON.parse(localStorage.getItem("userinfo"))
      : {}
    );

  return (
    <>
      <div className='headerimg'>
        <img src={logo} alt="pokemonlogo" />
      </div>
      <div className='mainContainer'>
        <Outlet context={[userinfo, setUserinfo]}/>
      </div>  
    </>
  )
};

export default MainLayout;