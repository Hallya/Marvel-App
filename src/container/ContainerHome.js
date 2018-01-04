import React from 'react';
import { connect } from 'react-redux';
import { getProfil, setInfo, fetchRelatedComics, fetchRelatedCharacters, fetchMore, setFalseOnDisplay } from '../actions/actions';
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
  addMoreResult,
  setProfilPlusDataCharacters,
  showDescription,
  refreshComics,
  displayRelatedData,
  closeTab,
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
            addMoreResult={addMoreResult}
            closeTab={closeTab}
            displayRelatedData={displayRelatedData}
          />
          :
          data.category === "comics" ?
            <Comics
              comics={data}
              filter={filter}
              setProfil={setProfil}
              actualProfil={actualProfil}
              showComics={showComics}
              showDescription={showDescription}
              isFetching={isFetching}
              info={info}
              closeTab={closeTab}
              profilAndData={setProfilPlusDataCharacters}
              addMoreResult={addMoreResult}
              displayRelatedData={displayRelatedData}
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
    addMore: (currentOffset, category) => {
      dispatch(fetchMore(currentOffset, category))
    },
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
    },
    closeTab: () => {
      dispatch(setFalseOnDisplay());
    }
  }
}
const mapStateToProps = state => {
  return {
    currentOffset: state.actualPage.offset,
    data: state.actualPage,
    isFetching: state.actualPage.isFetching,
    actualProfil: state.actualProfil,
    filter: state.visibilityFilter,
    info: state.actualProfil,
    actualId: state.actualProfil.id,
    relatedComics: state.actualProfil.relatedData.actualRelatedData,
    isFetchingRelatedComics: state.actualProfil.relatedData.isFetching,
    displayRelatedData: state.relatedData
  }
}
const mergeProps = (stateProps, dispatchProps) => {
  const
    { actualId } = stateProps,
    { getRelatedComics } = dispatchProps,
    { getRelatedCharacters } = dispatchProps,
    { relatedComics } = stateProps,
    { isFetchingRelatedComics } = stateProps,
    { addMore } = dispatchProps,
    { currentOffset } = stateProps;
  return {
    addMoreResult: (e) => {
      addMore(currentOffset[e.target.id], e.target.id);
    },
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
    displayRelatedData: stateProps.displayRelatedData,
    closeTab: dispatchProps.closeTab
  }
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeContainer);