import React from 'react';
import { connect } from 'react-redux';
import { fetchComic, fetchContent, setData } from '../actions/actions';
import { createRequestId, getConditions } from '../helpers/helpers';
import './ContainerRelatedComics.css'

const ContainerRelatedComics = ({ comics, setComicToProfil, data }) => {
  let actualRelatedData = comics.actualRelatedData;
  return (
    <ul className="list_Comics" >
      {
        (actualRelatedData && actualRelatedData.length > 0 && !comics.isFetching) ? actualRelatedData.map(comic => {
          return <li
            key={comic.id}
            id={comic.id}
            onClick={setComicToProfil}
            style={data && comic.id === data.id ? {color: "green"} : {color: "inherit"}} >{comic.title}</li>
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
      const requestId = createRequestId(e.target.id, getConditions("coOnly"));
      fetchContent(requestId)
        .then(data => dispatch(setData(requestId, data)))
        .catch(error => console.error(error))
    }
  }
}

const mapStateToProps = state => {
  return {
    comics: state.actualProfil.relatedData,
    data: state.relatedData.data
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ContainerRelatedComics);
