import './Pages.css'
import { Outlet } from "react-router-dom";
import logo from '../assets/pokemon.png'

const MainLayout = () => {
  return (
    <>
      <div className='headerimg'>
        <img src={logo} alt="pokemonlogo" />
      </div>
      <div className='mainContainer'>
        <Outlet />
      </div>  
    </>
  )
};

export default MainLayout;