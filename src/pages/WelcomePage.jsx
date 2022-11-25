import './Pages.css'
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='pokemonimg'>
                <img src="/pokemon.png" alt="pokemonlogo" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
                <button
                    style={{}}
                    className='welcomeBtn'
                    onClick={() => {
                        navigate('/home/userinfo');
                    }}
                >
                    <span className="welcome-text">Welcome to the Pokemon Selector</span>
                    <span className="start-text" >Click Here to Start!</span>
                </button>
            </div>
        </>
    )
};

export default WelcomePage;