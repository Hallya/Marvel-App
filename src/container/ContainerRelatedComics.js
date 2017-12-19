import React from 'react';
import { connect } from 'react-redux';
import './ContainerRelatedComics.css'

const ContainerRelatedComics = ({comics}) => {
  let actualRelatedData = comics.actualRelatedData;
  return (
    <ul className="list_Comics" >
      {
        actualRelatedData.length > 0 && !comics.isFetching ? actualRelatedData.map(comic => {
          return <li key={comic.id}>{comic.title}</li>
        })
          :
          actualRelatedData.length === 0 && !comics.isFetching ?
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
