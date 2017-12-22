import React from 'react';
import './Hero-v2.css';
import Loader from './Loader';
import Profil from './Profil';

const Hero = ({
  heros,
  setFilter,
  filter,
  setProfil,
  actualProfil,
  showDescription,
  showComics,
  profilAndData,
  refreshComics,
  isFetching,
  info }) => {

  return (heros) ?
    <div className="collection-v2" >
      {
        isFetching ? <Loader /> : null
      }
      <Profil
        profil={actualProfil}
        showDescription={showDescription}
        showComics={showComics}
        info={info} />
      <div className="mosaique" >
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
              <div className="hero__miniature" key={hero.id} onClick={profilAndData} >
                <img
                  className="hero__img"
                  
                  src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                  alt='Identity of hero'
                  />
                <div className="hero_miniature_frame" id={hero.id} ></div>
              </div>
            )
        })
      }
      </div>
    </div> 
    :
    <Loader />;
  };
  
  export default Hero;