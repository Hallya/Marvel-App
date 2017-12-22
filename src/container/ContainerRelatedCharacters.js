import React from 'react';
import { connect } from 'react-redux';
import './ContainerRelatedCharacters.css'

const ContainerRelatedComics = ({comics}) => {
  let actualRelatedData = comics.actualRelatedData;
  return (
    <ul className="list_Comics" >
      {
        (actualRelatedData && actualRelatedData.length > 0 && !comics.isFetching) ? actualRelatedData.map(comic => {
          return <li key={comic.id}>{comic.name}</li>
        })
        :
          (actualRelatedData.length === 0 || !actualRelatedData) && !comics.isFetching ?
          "N/A"
          :
          "Loading characters..."  
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
