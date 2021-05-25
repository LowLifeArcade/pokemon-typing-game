import React from 'react';

const PokemonBanner = ({ pokeArr }) => {
  return (
    <>
      {/* {pokeArr.map((pokemon) => {
        return <div className={`sprite ${pokemon}`}></div>;
      })} */}
      <div>
        <PokemonSprite pokeNum={28} />
      </div>
    </>
  );
};

export default PokemonBanner;

const PokemonSprite = ({ pokeNum }) => {
  let col = ((pokeNum % 16) - 1) * 64;
  let row = Math.floor(pokeNum / 16) * 64;

  return (
    <>
      <div className="grow">
        <div className="sprite"></div>
      </div>
      <style jsx>{`
        .sprite {
          width: 64px;
          height: 64px;
          background: url('/firered-leafgreen.png') no-repeat -${col}px -${row}px;
          object-fit: cover;

        }
        .grow {
          transform: scale(2.2);
          padding: 20px;
          margin: 10px;
        }
      `}</style>
    </>
  );
};
