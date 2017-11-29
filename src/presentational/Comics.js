import React from 'react';
import style from '../css/styles.css';
import Loader from '../presentational/Loader';

const Comics = ({ comics }) => {
  return (comics) ?
    <div className="collection comics">
      {
        comics.data.map(comic => {
          return (
            <div className="">
              <div className="">
                <img
                  className="comic__img"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt='cover comic'
                />
                <div className=""></div>
              </div>
              <div className="">
                <p className="">{}</p>
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