import React from 'react';
import { connect } from 'react-redux';
import { fetchCharacter } from '../actions/actions';
import './ContainerRelatedCharacters.css'

const ContainerRelatedComics = ({ comics, setCharacterToProfil }) => {
  let actualRelatedData = comics.actualRelatedData;
  return (
    <ul className="list_Comics" >
      {
        (actualRelatedData && actualRelatedData.length > 0 && !comics.isFetching) ? actualRelatedData.map(comic => {
          return <li key={comic.id} id={comic.id} onClick={setCharacterToProfil}>{comic.name}</li>
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

const mapDispatchToProps = dispatch => {
  return {
    setCharacterToProfil: e => {
      console.log(e.target.id)
      dispatch(fetchCharacter(e.target.id))
    }
  }
}

const mapStateToProps = state => {
  return {
    comics: state.actualProfil.relatedData,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ContainerRelatedComics);
