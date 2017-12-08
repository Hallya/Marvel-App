import React from 'react';
import { connect } from 'react-redux';
import './ContainerRelatedComics.css'

const ContainerRelatedComics = ({comics}) => {
  let relatedComics = comics.actualRelatedData;

  return (
    <ul className="list_Comics" >
      {
        relatedComics && !comics.isFetching ? relatedComics.map(comic => {
          return <li key={comic.id}>{comic.title}</li>
        })
          :
          relatedComics === [] && !comics.isFetching ?
            "N/A"
            :
            "Loading comics..."  
      }
    </ul>
  )
};

const mapStateToProps = state => {
  return {
    comics: state.actualProfil.relatedData,
  }
}



export default connect(mapStateToProps, null)(ContainerRelatedComics);
