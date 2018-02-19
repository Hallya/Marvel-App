import React from 'react';
import { connect } from 'react-redux';
import * as action from '../actions/actions';
import { getConditions, createRequestId, getCache, doubleRequest } from '../helpers/helpers';
import Heros from '../presentational/Hero-v2';
import Comics from '../presentational/Comicsv2';
import Loader from '../presentational/Loader';
import './ContainerHome.css';
import { actualPage } from '../reducers/reducers';
import { fetchRelatedCharacters, fetchContent } from '../actions/actions';

const HomeContainer = ({
  actualPage,
  isFetching,
  setProfil,
  actualProfil,
  filter,
  showComics,
  setProfilPlusData,
  addMoreResult,
  showDescription,
  refreshComics,
  relatedData,
  closeTab
}) => {
  return (
    <div className="content__container" >
      {
        actualPage.category === "characters" ?
          <Heros
            heros={actualPage}
            filter={filter}
            setProfil={setProfil}
            actualProfil={actualProfil}
            showComics={showComics}
            showDescription={showDescription}
            isFetching={actualPage.isFetching}
            info={actualProfil}
            profilAndData={setProfilPlusData}
            addMoreResult={addMoreResult}
            closeTab={closeTab}
            displayRelatedData={relatedData}
          />
          :
          actualPage.category === "comics" ?
            <Comics
              comics={actualPage}
              filter={filter}
              setProfil={setProfil}
              actualProfil={actualProfil}
              showComics={showComics}
              showDescription={showDescription}
              isFetching={actualPage.isFetching}
              info={actualProfil}
              closeTab={closeTab}
              profilAndData={setProfilPlusData}
              addMoreResult={addMoreResult}
              displayRelatedData={relatedData}
            />
            :
            actualPage.isFetching ? <Loader />
              :
              ""
      }
      {
        actualPage.category === undefined && !isFetching ?
        <p className="home_message" >SELECT A CATEGORY</p> : null
      }
    </div>
  )
};

const mapDispatchToProps = dispatch => { 
  return {
    setProfil: action.actualiseProfil(dispatch),
    showDescription: e => dispatch(action.setInfo('description')),
    showComics: e => dispatch(action.setInfo('comics')),
    requestRelatedData: requestId => dispatch(action.requestRelatedData(requestId)),
    requestFetch: (category, requestId) => dispatch(action.requestFetch(category, requestId)),
    addMore: (category, data) => dispatch(action.addMore(category, data)),
    setRelatedData: (requestId, data) => dispatch(action.setRelatedData(requestId, data)),
    resetRelatedData: (id, data) => dispatch(action.resetRelatedData(id, data)),
    closeTab: () => dispatch(action.setFalseOnDisplay())
  }
}
const mapStateToProps = state => {
  return {
    getProfil: () => action.getProfil(state),
    actualPage: state.actualPage,
    actualProfil: state.actualProfil,
    filter: state.visibilityFilter,
    relatedData: state.relatedData
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  const
    { getProfil } = stateProps,
    { actualPage } = stateProps,
    { actualProfil } = stateProps,
    { requestFetch } = dispatchProps,
    { requestRelatedData } = dispatchProps,
    { resetRelatedData } = dispatchProps,
    { setRelatedData } = dispatchProps,
    { setProfil } = dispatchProps,
    { addMore } = dispatchProps,
    characters = "characters",
    comics = "comics";
  
  return {

    addMoreResult: (e) => {

      const requestId = createRequestId((20 + actualPage.offset).toString(), getConditions(actualPage.category === characters ? "co" : "ch"));
      requestFetch(e.target.id, requestId);
      fetchContent(requestId)
        .then(data => addMore(actualPage.category, data))
        .catch(err => console.error(err))
    },

    setProfilPlusData: (e) => {

      const requestId = createRequestId(e.target.id, getConditions(actualPage.category === characters ? "relCo" : "relCh"));

      if (!doubleRequest(requestId, actualProfil.id)) {
        const cacheRelatedData = getCache(requestId, actualProfil.relatedData.previousRelatedData);
        if (cacheRelatedData) {
          resetRelatedData(requestId, cacheRelatedData.data);
        }
        else {
          requestRelatedData(requestId);
          fetchContent(requestId)
            .then(data => setRelatedData(requestId, data))
            .catch(err => console.error(err))
        }
        return setProfil(getProfil()(e.target.id))
      }
    },
    showComics: e => dispatchProps.showComics(e),
    showDescription: dispatchProps.showDescription,
    setProfil: dispatchProps.setProfil,
    actualPage: actualPage,
    actualProfil: actualProfil,
    filter: stateProps.filter,
    relatedData: stateProps.relatedData,
    closeTab: dispatchProps.closeTab
  }
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeContainer);