  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import '../Css/Corps.css';

  const Corps = () => {
    const [list, setlist] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
      const fetching = async () => {
        try {
          const Pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302');
          const results = Pokemon.data.results;
          const about = await Promise.all(
            results.map(async (pokemon) => {
              const PokeAbout = await axios.get(pokemon.url);
              const Id = pokemon.url.split('/').filter(Boolean);
              const id = Id[Id.length - 1];

              return {
                name: pokemon.name,
                id,
                image:
                  PokeAbout.data.sprites.other['official-artwork'].front_default ||
                  PokeAbout.data.sprites.front_default,
                types: PokeAbout.data.types.map((t) => t.type.name),
              };
            })
          );


          setlist(about);
        } catch (error) {
          console.error('Api error');
        }
      };

      fetching();
    }, []);

    const filteredList = list.filter((pokemon) => pokemon.name.includes(searchTerm) || pokemon.id.includes(searchTerm));

    return (
      <>
        <div style={{ marginTop: '2ch', textAlign: 'center' }}>
          <input className='input'
            type="text"
            placeholder="Search by name or Id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          
          />
        </div>

        <div className="Corps" style={{ textAlign: 'center' }}>
          <div
            className="PokeCarte"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4ch',
              padding: '20px',
            }}
          >
            {filteredList.slice(0, visibleCount).map((pokemon) => (
              <div key={pokemon.name}>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{ width: '100%', height: '150px', objectFit: 'contain' }}
                />

                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    style={{
                      fontSize: '12px',
                      backgroundColor: '#334155',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      color: '#cbd5e1',
                      textTransform: 'uppercase',
                      marginRight: '5px',
                    }}
                  >
                    {type}
                  </span>
                ))}
                <p>
                  #{pokemon.id} - {pokemon.name}
                </p>
              </div>
            ))}
          </div>

          {visibleCount < filteredList.length && (
            <button
              onClick={() => setVisibleCount(visibleCount + 9)}
              style={{
                marginTop:'-1ch',
                padding: '10px 20px',
                backgroundColor: 'Gold',
                border: 'none',
                fontSize:'1.2rem',
                borderRadius: '6px',
                color: '#000814',
                cursor: 'pointer',
              }}
            >
              next
            </button>
          )}
        </div>
      </>
    );
  };

  export default Corps;
