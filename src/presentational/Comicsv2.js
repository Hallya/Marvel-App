import React from 'react';
import './Comics-v2.css';
import Loader from './Loader';
import ProfilComic from './ProfilComic';

const Comics = ({
  comics,
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

  return (comics) ?
    <div className="collection-v2" >
      {
        isFetching ? <Loader /> : null
      }
      <ProfilComic
        profil={actualProfil}
        showDescription={showDescription}
        showComics={showComics}
        info={info}
      />
      <div className="mosaique" >
        {
          comics.data.filter(comic => {
            const match = /image_not_available/;
            if (filter.images && filter.description) {
              return (!match.test(comic.thumbnail.path) && !(comic.description === "" || comic.description === " "))
            }
            else if (filter.images && !filter.description) {
              return (!match.test(comic.thumbnail.path));
            }
            else if (filter.description && !filter.images) {
              return !(comic.description === null);
            }
            return comic;
          }).map(comic => {
            return (
              <div className="comic__miniature" key={comic.id} onClick={profilAndData} >
                <img
                  className="comic__img"

                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt='Identity of comic'
                />
                <div className="comic_miniature_frame" id={comic.id} ></div>
              </div>
            )
          })
        }
      </div>
    </div>
    :
    <Loader />;
};

export default Comics;