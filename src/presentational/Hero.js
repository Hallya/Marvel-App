import React from 'react';
// import '../css/styles.css';
import Loader from '../presentational/Loader';

const Hero = ({ heros, filter }) => {

  return (heros) ?
    <div className="collection" >  
      {
        heros.data.filter(hero => {
          const match = /image_not_available/;
          if (filter.images && filter.description) {
            return (!match.test(hero.thumbnail.path) && !(hero.description === "" || hero.description === " "))
          }
          else if (filter.images && !filter.description) {
            return(!match.test(hero.thumbnail.path));
          }
          else if (filter.description && !filter.images) {
            return !(hero.description === "" || hero.description === " ");
          }
          return hero;
        }).map(hero => {
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