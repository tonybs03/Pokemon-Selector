import { Button, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const baseUrl = "https://pokeapi.co/api/v2";

const PokePicker = () => {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [types, setTypes] = useState([]);
  const [typedPokemon, setTypedPokemon] = useState([]);
  const [pokeDetail, setPokeDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [userinfo, setUserinfo] = useOutletContext();
  const [selectedPokemon, setSelectedPokemon] = useState(userinfo["pokemon"]);
  const navigate = useNavigate();

  const styles = {
    formHeader: {
      textAlign: "center",
      margin: "auto",
      color: "white",
      fontWeight: "900",
      fontSize: 18,
      marginBottom: "30px",
    },
    pokemonDisplay: {
      textAlign: "center",
      margin: "auto",
      color: "white",
      fontWeight: "900",
      fontSize: 18,
      marginBottom: "30px",
    },
  };

  const columns = [
    {
      title: "Pokemon Name",
      dataIndex: "name",
      render: (text, record) => (
        <Button
          onClick={() => {
            setSelectedPokemon(record.name);
            storeSelectedPokemon(record.name);
          }}
          type="link"
          style={{ fontSize: 15, color: "black" }}
        >
          {JSON.stringify(record.name).replace(/\"/g, "")[0].toUpperCase() +
            JSON.stringify(record.name).replace(/\"/g, "").substring(1)}
        </Button>
      ),
    },
    {
      title: "Pokemon Specs",
      dataIndex: "url",
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
    const res = await axios.get("https://pokeapi.co/api/v2/type/" + e);
    const newArr = res.data.pokemon.map((e) => e.pokemon.name);
    console.log(newArr);
    setTypedPokemon(newArr);
  };

  const fetchTypes = async () => {
    const res = await axios.get(`${baseUrl}/type?limit=30`);
    setTypes(
      res.data.results.map((e) => {
        return {
          id: e.name,
          value: e.name,
        };
      })
    );
  };

  const fetchPokemonAndSetList = async () => {
    const res = await axios.get(`${baseUrl}/pokemon?limit=1154`);
    setList(res.data.results);
  };

  const storeSelectedPokemon = (name) => {
    let temp = {
      ...userinfo,
      pokemon: name[0].toUpperCase() + name.substring(1),
    };
    setUserinfo(temp);
    localStorage.setItem("userinfo", JSON.stringify(temp));
  };

  const clearSelectedPokemon = () => {
    let temp = { ...userinfo, pokemon: undefined };
    setSelectedPokemon(undefined);
    setUserinfo(temp);
    localStorage.setItem("userinfo", JSON.stringify(temp));
  };

  useEffect(() => {
    fetchPokemonAndSetList();
    fetchTypes();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginBottom: 10,
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            navigate("/home/userinfo");
          }}
        >
          Edit My Info
        </Button>
      </div>

      <div style={styles.formHeader}>
        <h2>Please choose your favorite Pokemon!</h2>
        <p style={{ fontSize: 12, fontWeight: "bold" }}>
          (Click on the name to choose as your favorite, or click on "Details"
          to see more specs!)
        </p>
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
              return p;
            }
            return typedPokemon.includes(p.name);
          })}
      ></Table>

      <div style={styles.pokemonDisplay}>
        {selectedPokemon ? (
          <h2>
            You have chosen{" "}
            {selectedPokemon[0].toUpperCase() + selectedPokemon.substring(1)} as
            your favorite!!
          </h2>
        ) : (
          <h3 style={{ fontSize: 12, fontWeight: "bold" }}>
            You haven't chosen your favorite Pokemon yet!
          </h3>
        )}
      </div>

      <div
        style={{
          display: "flex",
          marginBottom: 10,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            navigate("/home/review");
          }}
          disabled={!(selectedPokemon === undefined)}
          style={{ margin: 10 }}
        >
          Skip for Now
        </Button>

        <Button
          type="primary"
          onClick={() => {
            clearSelectedPokemon();
          }}
          disabled={selectedPokemon === undefined}
          style={{ margin: 10 }}
        >
          Clear My Choice
        </Button>

        <Button
          type="primary"
          onClick={() => {
            navigate("/home/review");
          }}
          disabled={selectedPokemon === undefined}
          style={{ margin: 10 }}
        >
          Next: Review
        </Button>
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: '60%' }}>
            {pokeDetail.stats?.map((stat) => (
              <div key={JSON.stringify(stat["stat"]["name"])}>
                <span>
                  {stat["stat"]["name"][0].toUpperCase() +
                    stat["stat"]["name"].substring(1) +
                    ": "}
                </span>
                <span>{stat["base_stat"]}</span>
              </div>
            ))}

            <div>
              <span>Aibilities: </span>
              <span>
                {pokeDetail.abilities?.map((a) => (
                  <span key={JSON.stringify(a.ability)}>
                    {a.ability.name[0].toUpperCase() +
                      a.ability.name.substring(1) +
                      " "}
                  </span>
                ))}
              </span>
            </div>

            <div>
              <span>Height: </span>
              <span>{pokeDetail?.height}</span>
            </div>

            <div>
              <span>Weight: </span>
              <span>{pokeDetail?.weight}</span>
            </div>
          </div>
          <div style={{ width: '60%', display: 'flex' }}>
            {pokeDetail.sprites ? (
              pokeDetail.sprites["front_default"] == null ? (
                ""
              ) : (
                <img src={pokeDetail?.sprites["front_default"]} alt="pokemon" />
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PokePicker;
