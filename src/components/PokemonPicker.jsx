import { Button, Input, Modal, Select, Table } from 'antd';
import DisabledContext from 'antd/es/config-provider/DisabledContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'https://pokeapi.co/api/v2';

// 1. get all types
// 2. allow users to filter by types
// 3. allow users to filter by 
// Possible Performance Improvs
// use a custom hook?
// use a useReducer instead?
// useMemo? useCallback?

const PokePicker = () => {
    const [list, setList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [types, setTypes] = useState([]);
    const [typedPokemon, setTypedPokemon] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(localStorage.getItem("userinfo") ? (JSON.parse(localStorage.getItem("userinfo"))['fav'] ? (JSON.parse(localStorage.getItem("userinfo"))['fav']) : ('')):(''));
    const [pokeDetail, setPokeDetail] = useState({});
    const [open, setOpen] = useState(false);
    const [userinfo, setUserinfo] = useState(localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : {});
    const navigate = useNavigate();

    const styles = {
        formHeader: {
            textAlign: 'center', margin: 'auto', color: 'white',
            fontWeight: '900', fontSize: 18, marginBottom: '30px'
        },
        pokemonDisplay: {
            textAlign: 'center', margin: 'auto', color: 'white',
            fontWeight: '900', fontSize: 18, marginBottom: '30px'
        }
    };

    const columns = [
        {
            title: 'Pokemon Name',
            dataIndex: 'name',
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setSelectedPokemon(record.name);
                        storeSelectedPokemon(record.name);
                    }}
                    type="link"
                    style={{ fontSize: 15, color: 'black' }}
                >
                    {JSON.stringify(record.name).replace(/\"/g, "")[0].toUpperCase() + JSON.stringify(record.name).replace(/\"/g, "").substring(1)}
                </Button>
            ),
        },
        {
            title: 'Pokemon Specs',
            dataIndex: 'url',
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setOpen(true);
                        fetchPokemonByName(record.name);
                    }}
                    type="link"
                >
                    Details
                </Button>
            ),
        },
    ];

    const fetchPokemonByName = async (name) => {
        const res = await axios.get(`${baseUrl}/pokemon/${name}`);
        setPokeDetail(res.data);
    };

    const fetchPokemonByType = async (e) => {
        const res = await axios.get(
            'https://pokeapi.co/api/v2/type/' + e
        );
        const newArr = res.data.pokemon.map((e) => e.pokemon.name);
        console.log(newArr)
        setTypedPokemon(newArr);
    };

    const fetchTypes = async () => {
        const res = await axios.get(`${baseUrl}/type?limit=30`);
        setTypes(
            res.data.results.map((e) => {
                return {
                    id: e.name,
                    value: e.name
                };
            })
        );

    };

    const fetchPokemonAndSetList = async () => {
        const res = await axios.get(`${baseUrl}/pokemon?limit=1154`); // this is your pokemon data
        setList(res.data.results);
    };

    const storeSelectedPokemon = (name) => {
        userinfo['fav'] = name[0].toUpperCase() + name.substring(1);
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
    }

    useEffect(() => {
        fetchPokemonAndSetList();
        fetchTypes();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', marginBottom: 10, justifyContent: 'space-between' }}>
                <Button type="primary" onClick={() => { navigate('/home/userinfo') }} >
                    Go Back
                </Button>
            </div>

            <div style={styles.formHeader}>
                <h2>Please choose your favorite Pokemon!</h2>
                <p style={{ fontSize: 12, fontWeight: 'bold' }}>(Click on the name to choose as your favorite, or click on "Details" to see more specs!)</p>
            </div>

            <Input
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
                placeholder="Enter a name to start search"
                style={{ marginBottom: 10 }}
            />

            <Select
                onSelect={(e) => {
                    fetchPokemonByType(e);
                }}
                placeholder="Select type"
                style={{ width: 150, marginBottom: 10 }}
                options={types}
            ></Select>

            <Table
                columns={columns}
                rowKey="name"
                dataSource={list
                    .filter((p) => {
                        return p.name.includes(keyword.toLowerCase());
                    })
                    .filter((p) => {
                        if (typedPokemon.length === 0) {
                            return p
                        }
                        return typedPokemon.includes(p.name);
                    })
                }
            ></Table>

            <div style={styles.pokemonDisplay}>
                {selectedPokemon ? (
                    <h2>You have chosen {selectedPokemon[0].toUpperCase() + selectedPokemon.substring(1)} as your favorite!!</h2>
                ) : (
                    <h3 style={{ fontSize: 12, fontWeight: 'bold' }}>You haven't chosen your favorite Pokemon yet!</h3>        
                ) }
            </div>

            <div style={{ display: 'flex', marginBottom: 10, justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={() => { navigate('/home/userinfo') }} disabled={selectedPokemon == ''} >
                    Next: Review
                </Button>
            </div>

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => setOpen(false)}
            >
                <div>
                    <span>Aibilities: </span>
                    <span>
                        {pokeDetail.abilities?.map((a) => (
                            <span key={JSON.stringify(a.ability)} className="ab">{a.ability.name + " "}</span>
                        ))}
                    </span>
                </div>
            </Modal>
        </div>
    );
};

export default PokePicker;