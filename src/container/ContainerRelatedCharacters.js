import React from 'react';
import { connect } from 'react-redux';
import { fetchComic, fetchContent, setData } from '../actions/actions';
import { createRequestId, getConditions } from '../helpers/helpers';
import './ContainerRelatedCharacters.css'

const ContainerRelatedCharacters = ({ characters, setCharacterToProfil, data }) => {
  let actualRelatedData = characters.actualRelatedData;
  return (
    <ul className="list_Comics" >
      {
        (actualRelatedData && actualRelatedData.length > 0 && !characters.isFetching) ? actualRelatedData.map(character => {
          return(
            <li
              key={character.id}
              id={character.id}
              onClick={setCharacterToProfil}
              style={data && character.id === data.id ? {color: "green"} : {color: "inherit"}}
            >
              {character.name}
            </li>
          )
        })
        :
          (actualRelatedData.length === 0 || !actualRelatedData) && !characters.isFetching ?
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
      const requestId = createRequestId(e.target.id, getConditions("chOnly"));
      fetchContent(requestId)
        .then(data => dispatch(setData(requestId, data)))
        .catch(error => console.error(error))
    }
  }
}

const mapStateToProps = state => {
  return {
    characters: state.actualProfil.relatedData,
    data: state.relatedData.data
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ContainerRelatedCharacters);
