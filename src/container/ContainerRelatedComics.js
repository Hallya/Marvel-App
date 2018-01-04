import React from 'react';
import { connect } from 'react-redux';
import { fetchComic } from '../actions/actions'
import './ContainerRelatedComics.css'

const ContainerRelatedComics = ({ comics, setComicToProfil }) => {
  let actualRelatedData = comics.actualRelatedData;
  return (
    <ul className="list_Comics" >
      {
        (actualRelatedData && actualRelatedData.length > 0 && !comics.isFetching) ? actualRelatedData.map(comic => {
          return <li key={comic.id} id={comic.id} onClick={setComicToProfil} >{comic.title}</li>
        })
        :
          (actualRelatedData.length === 0 || !actualRelatedData) && !comics.isFetching ?
          "N/A"
          :
          "Loading comics..."  
      }
    </ul>
  )
};

const mapDispatchToProps = dispatch => { 
  return {
    setComicToProfil: e => {
      dispatch(fetchComic(e.target.id))
    }
  }
}

const mapStateToProps = state => {
  return {
    comics: state.actualProfil.relatedData,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ContainerRelatedComics);
