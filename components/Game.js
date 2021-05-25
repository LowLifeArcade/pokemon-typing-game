import { useReducer, useRef } from 'react';
import Header from './Header';
import PokemonBanner from './PokemonBanner';

const pokemonArray = ['Pikachu', 'Bulbazor', 'Charazar', 'hit'];

function useMyState(initialState) {
  let [state, dispatch] = useReducer(
    (state, action) => {
      return action;
    },
    {
      initialState,
    }
  );
  return [state, dispatch];
}

// enums
const UserStatus = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const useGameReducer = () => {
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'START_GAME': {
          // pokeInput.focus();
          return { ...state, gameState: 'STARTED', gameText: 'You can do it!' };
        }
        case 'END_GAME': {
          return {
            ...state,
            gameState: 'FINISHED',
            gameText: 'Hmm, try again',
            currentPokemon: '',
          };
        }
        case 'RESTART_GAME': {
          return { ...state, gameState: 'NOT_STARTED', gameText: '', score: 0 };
        }
        case 'TYPE_POKEMON': {
          console.log(action.pokemon);
          return { ...state, currentPokemon: action.pokemon };
        }
        case 'SUBMIT_POKEMON': {
          let newScore = state.score;

          if (pokemonArray.includes(action.pokemon)) newScore += 1;
          else newScore -= 1;

          return { ...state, currentPokemon: '', score: newScore };
        }
        default: {
          throw new Error('Unrecognized state');
        }
      }
    },
    {
      // initial state
      gameState: 'NOT_STARTED',
      score: 0,
      currentPokemon: '',
    }
  );
  return [state, dispatch];
};

// function usePokemon() {
//   let [pokemon, setPokemon] = useState('Pikachu')
//   let [img, setImg] = useState(null)
//   let [error, setError] = useState(null)

//   // let title = pokemon.toUpperCase()

//   // useEffect(() => {
//   //   document.title = 'pokemon is ' + title
//   // }, [title]);

//   useEffect(() => {
//     let current = true;
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     .then((res) => res.json)
//     .then(() => {
//       let name = res.name
//       let sprite = res.sprites.front_default
//       if (current) {
//         setPokemon(name)
//         setImg(sprite)
//       }
//     })
//     .catch(error => setError(error))
//     return () => {
//       current = false
//     }
//   }, [pokemon]);
//  return  [pokemon, img]
// }

const Game = () => {
  const pokeInput = useRef();
  let [myState, setMyState] = useMyState(1);
  let [state, dispatch] = useGameReducer();




  let { gameState, score, gameText, currentPokemon } = state;
  console.log('pokemon', currentPokemon);
  return (
    <>
      <div className="container">
        <Header text={gameText} />
        {gameState === 'NOT_STARTED' && (
          <button
            onClick={() => {
              dispatch({ type: 'START_GAME' });
            }}
          >
            Start Game
          </button>
        )}
        {gameState == 'STARTED' && (
          <>
          <PokemonBanner />
            <input
              autoFocus
              // ref={pokeInput}
              type="text"
              placeholder={'Type here'}
              value={currentPokemon}
              onChange={(e) => {
                dispatch({
                  type: 'TYPE_POKEMON',
                  pokemon: e.target.value,
                });
              }}
              onKeyPress={(e) => {
                e.key === 'Enter' &&
                  dispatch({
                    type: 'SUBMIT_POKEMON',
                    pokemon: e.target.value,
                  });
              }}
            />
            <br />
            <button
              onClick={() => {
                dispatch({ type: 'END_GAME' });
              }}
            >
              Be a quitter
            </button>
          </>
        )}
        {gameState === 'FINISHED' && (
          <div>
            <div>Score: {score}</div>
            <button
              onClick={() => {
                dispatch({ type: 'RESTART_GAME' });
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
