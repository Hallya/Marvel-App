import React from 'react';
import './Comics.css';
import Loader from '../presentational/Loader';

const Comics = ({ comics, filter }) => {
  return (comics) ?
    <div className="collection">
      {
        comics.data.filter(comic => {
          const match = /image_not_available/;
          if (filter.images && filter.description) {
            return (!match.test(comic.thumbnail.path) && !(comic.description === null))
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
            <div className="comic comic__hover" key={comic.id} >
              <div className="comic__front">
                <img
                  className="comic__img"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt='cover comic'
                />
                <div className="comic_image_frame"></div>
              </div>
              <div className="comic__back">
                <p className="comic__description">{comic.description}</p>
              </div>
              <p className="comic__name">{comic.title}</p>
            </div>
          )
        })
      }
    </div>
    :
    <Loader />
};

export default Comics;