import './Pages.css'
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className='headerimg'>
        <img src="/pokemon.png" alt="pokemonlogo" />
      </div>
      <div className='mainContainer'>
        <Outlet />
      </div>  
    </>
  )
};

export default MainLayout;