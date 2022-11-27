import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import WelcomePage from './pages/WelcomePage';
import UserInfoForm from './components/UserInfoForm';
import PokePicker from './components/PokemonPicker';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="background">
          <span><img src="/pokeball.png" alt="pokeballs" /></span>
          <span><img src="/pokeball.png" alt="pokeballs" /></span>
          <span><img src="/pokeball.png" alt="pokeballs" /></span>
          <span><img src="/pokeball.png" alt="pokeballs" /></span>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/home" element={<MainLayout />}>
          <Route exact path='/home' element={<UserInfoForm />}></Route>
          <Route exact path='/home/userinfo' element={<UserInfoForm />}></Route>
          <Route exact path='/home/poke' element={<PokePicker />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
