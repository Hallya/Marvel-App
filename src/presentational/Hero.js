import React from 'react';
// import style from '../css/styles.css';
import Loader from '../presentational/Loader';

const Hero = ({ heros }) => {

  return (heros) ?
    <div className="collection" >  
      {
        heros.data.map(hero => {
          return (
            <div key={hero.id} className="hero hero__hover">
              <div className="hero__front">
                <img
                  className="hero__image"
                  src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                  alt='Identity of hero'
                />
                <div className="hero_image_frame"></div>
              </div>
              <div className="hero__back">
                <p className="hero__description">{hero.description}</p>
              </div>
              <p className="hero__name">{hero.name}</p>
            </div>
          )
        })
      }
    </div> 
    :
    <Loader />;
};

export default Hero;
