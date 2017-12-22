import React from 'react';
import './ProfilComic.css';
import ContainerRelatedCharacters from '../container/ContainerRelatedCharacters';

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
              <ul>
                <li className="profil_select_info"
                  onClick={showDescription}
                  value="description">
                  <input
                    type="radio"
                    name="info"
                    
                    className="profil__description_radio"
                    checked={info.infosDisplayed === "description" ? true : false}
                  />  
                  <div className='check'></div>
                  <label className="profil__description">description</label>
                </li>
                <li
                  className="profil_select_info"
                  onClick={showComics}
                  value="comics">
                  <input
                    type="radio"
                    name="info"
                    className="profil__description_radio"
                    checked={info.infosDisplayed === "comics" ? true : false}
                  />
                  <div className='check'></div>
                  <label className="profil__comics">Characters</label>
                </li>
              </ul>
              <hr/>
              <div>
                <p className="profil_comics_found">
                  {
                    profil.data.characters.available ?
                      profil.data.characters.available
                      : 0
                  } Character{
                    profil.data.characters.available <= 1 ? "" : "s"
                  } found
                </p>
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
                  <ContainerRelatedCharacters info={info}/>
                :
                ""
              }
            </div>
          </div>
      </div>
        :
        <p className='profil_message'>SELECT<br/>COMIC</p>  
    }
    </div >
  )
};

export default Profil;