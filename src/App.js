import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import WelcomePage from './pages/WelcomePage';
function App() {
  return (
    <BrowserRouter>
      <div>
        <div class="background">
          <span><img src="/pokeball.png" alt="pokeballs" /></span>
          <span><img src="/pokeball.png" alt="pokeballs" /></span>
          <span><img src="/pokeball.png" alt="pokeballs" /></span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<MainLayout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
