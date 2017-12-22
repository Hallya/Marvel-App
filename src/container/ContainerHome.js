import React from 'react';
import { connect } from 'react-redux';
import { getProfil, setInfo, fetchRelatedComics, fetchRelatedCharacters } from '../actions/actions';
import Heros from '../presentational/Hero-v2';
import Comics from '../presentational/Comicsv2';
import Loader from '../presentational/Loader';
import './ContainerHome.css';

const HomeContainer = ({
  data,
  isFetching,
  setProfil,
  actualProfil,
  filter,
  showComics,
  setProfilPlusData,
  setProfilPlusDataCharacters,
  showDescription,
  refreshComics,
  info }) => {
  return (
    <div className="content__container" >
      {
        data.category === "characters" ?
          <Heros
            heros={data}
            filter={filter}
            setProfil={setProfil}
            actualProfil={actualProfil}
            showComics={showComics}
            showDescription={showDescription}
            isFetching={isFetching}
            info={info}
            profilAndData={setProfilPlusData}
          />
          :
          data.category === "comics" && !data.isFetching ?
            <Comics
              comics={data}
              filter={filter}
              setProfil={setProfil}
              actualProfil={actualProfil}
              showComics={showComics}
              showDescription={showDescription}
              isFetching={isFetching}
              info={info}
              profilAndData={setProfilPlusDataCharacters}
            />
            :
            isFetching ? <Loader />
              :
              ""
      }
      {
        data.category === undefined && !isFetching ?
        <p className="home_message" >SELECT A CATEGORY</p> : null
      }
    </div>
  )
};

const mapDispatchToProps = dispatch => { 
  return {
    setProfil: e => {
      dispatch(getProfil(e.target.id));
    },
    showDescription: e => {
      dispatch(setInfo('description'))
    },
    showComics: e => {
        dispatch(setInfo('comics'))
    },
    getRelatedComics: e => {
      dispatch(fetchRelatedComics(e.target.id));
    },
    getRelatedCharacters: e => {
      dispatch(fetchRelatedCharacters(e.target.id));
    }
  }
}
const mapStateToProps = state => {
  return {
    data: state.actualPage,
    isFetching: state.actualPage.isFetching,
    actualProfil: state.actualProfil,
    filter: state.visibilityFilter,
    info: state.actualProfil,
    actualId: state.actualProfil.id,
    relatedComics: state.actualProfil.relatedData.actualRelatedData,
    isFetchingRelatedComics: state.actualProfil.relatedData.isFetching
  }
}
const mergeProps = (stateProps, dispatchProps) => {
  const { actualId } = stateProps,
    { getRelatedComics } = dispatchProps,
    { getRelatedCharacters } = dispatchProps,
    { relatedComics } = stateProps,
    { isFetchingRelatedComics } = stateProps;
  return {
    setProfilPlusData: (e) => {
      getRelatedComics(e);
      dispatchProps.setProfil(e);
    },
    setProfilPlusDataCharacters: (e) => {
      getRelatedCharacters(e);
      dispatchProps.setProfil(e);
    },
    showComics: (e) => {
      dispatchProps.showComics(e);
      // getRelatedComics(actualId);
    },
    refreshComics: () => {
      if (relatedComics && isFetchingRelatedComics) 
        getRelatedComics(actualId);
    },
    showDescription: dispatchProps.showDescription,
    setProfil: dispatchProps.setProfil,
    data: stateProps.data,
    isFetching: stateProps.isFetching,
    actualProfil: stateProps.actualProfil,
    filter: stateProps.filter,
    info: stateProps.info,
    actualId: stateProps.actualId,
  }
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeContainer);