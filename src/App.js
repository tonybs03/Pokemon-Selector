import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import WelcomePage from './pages/WelcomePage';
import UserInfoForm from './components/UserInfoForm';
import PokePicker from './components/PokemonPicker';
import ReviewPage from './components/ReviewPage';
import ball from './assets/pokeball.png'

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <div className="background">
          <span><img src={ball} alt="pokeballs" /></span>
          <span><img src={ball} alt="pokeballs" /></span>
          <span><img src={ball} alt="pokeballs" /></span>
          <span><img src={ball} alt="pokeballs" /></span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<MainLayout />}>
          <Route path='/home' element={<UserInfoForm />}></Route>
          <Route path='/home/userinfo' element={<UserInfoForm />}></Route>
          <Route path='/home/poke' element={<PokePicker />}></Route>
          <Route path='/home/review' element={<ReviewPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
