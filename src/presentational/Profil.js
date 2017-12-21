import React from 'react';
import './Profil.css';
import ContainerRelatedComics from '../container/ContainerRelatedComics';

const Profil = ({
  profil,
  showComics,
  showDescription,
  refreshComics,
  info }) => {

  return (
    <div className="profil">
    { profil.data ? 
        <div className="profil__tab" key={profil.data.id} >
          <div className="profil_hero_img">
            <img
              className="profil__img"  
              src={`${profil.data.thumbnail.path}.${profil.data.thumbnail.extension}`}
              alt={`Face of ${profil.data.name}`}
            />
            <div className="profil_img_frame"></div>
          </div>
          <div className="profil_hero_infos">
            <p className="profil__name"
              onChange={refreshComics}>{profil.data.name}</p>
            <form >
              <div className="profil_select_info" >
                <input
                  type="radio"
                  name="info"
                  value="description"
                  className="profil__description_radio"
                  onChange={showDescription}
                  checked={info.infosDisplayed === "description" ? true : false}
                />  
                <p className="profil__description">description</p>
              </div>
              <div className="profil_select_info">
                <input
                  type="radio"
                  name="info"
                  value="comics"
                  className="profil__description_radio"
                  onChange={showComics}
                  checked={info.infosDisplayed === "comics" ? true : false}
                />
                <p className="profil__comics">Comics</p>
              </div>
              <hr/>
              <div>
                <p className="profil_comics_found">{profil.data.comics.available} Comics found</p>
              </div>
            </form>  
          </div>
          <div className="profil_hero_text">
            <div className="profil__text">
              {info.infosDisplayed ?
                info.infosDisplayed === "description" ?
                  profil.data.description ?
                    profil.data.description
                    :
                    "N/A"
                  :
                  <ContainerRelatedComics info={info}/>
                :
                ""
              }
            </div>
          </div>
      </div>
        :
        <p className='profil_message'>SELECT<br/>CHARACTER</p>  
    }
    </div >
  )
};

export default Profil;