import React from 'react';
import { connect } from 'react-redux';
import { getProfil, setInfo, fetchRelatedComics } from '../actions/actions';
import Heros from '../presentational/Hero-v2';
import Comics from '../presentational/Comics';
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
            info={info}
            profilAndData={setProfilPlusData}
          />
          :
          data.category === "comics" && !data.isFetching ?
            <Comics
              comics={data}
              filter={filter}
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
        dispatch(setInfo(e.target.value))
    },
    showComics: e => {
        dispatch(setInfo(e.target.value))
    },
    getRelatedComics: e => {
      console.log(e.target.id);
      dispatch(fetchRelatedComics(e.target.id));
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
    idCharacter: state.actualProfil.id,
    relatedComics: state.actualProfil.relatedData.actualRelatedData,
    isFetchingRelatedComics: state.actualProfil.relatedData.isFetching
  }
}
const mergeProps = (stateProps, dispatchProps) => {
  const { idCharacter } = stateProps,
    { getRelatedComics } = dispatchProps,
    { relatedComics } = stateProps,
    { isFetchingRelatedComics } = stateProps;
  return {
    setProfilPlusData: (e) => {
      getRelatedComics(e);
      dispatchProps.setProfil(e);
    },
    showComics: (e) => {
      dispatchProps.showComics(e);
      // getRelatedComics(idCharacter);
    },
    refreshComics: () => {
      if (relatedComics && isFetchingRelatedComics) 
        getRelatedComics(idCharacter);
    },
    showDescription: dispatchProps.showDescription,
    setProfil: dispatchProps.setProfil,
    data: stateProps.data,
    isFetching: stateProps.isFetching,
    actualProfil: stateProps.actualProfil,
    filter: stateProps.filter,
    info: stateProps.info,
    idCharacter: stateProps.idCharacter,
  }
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeContainer);