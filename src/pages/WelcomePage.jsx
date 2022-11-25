import './Pages.css'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='pokemonimg'>
                <img src="/pokemon.png" alt="pokemonlogo" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
                <Button
                    type="primary"
                    size='large'
                    onClick={() => {
                        navigate('/home');
                    }}
                >
                    Welcome to the Pokemon Selector
                </Button>
            </div>
        </>
    )
};

export default WelcomePage;