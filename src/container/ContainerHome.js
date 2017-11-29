import React from 'react';
import { connect } from 'react-redux';
import Heros from '../presentational/Hero';
import Comics from '../presentational/Comics';
import Loader from '../presentational/Loader';
import style from '../css/styles.css';

const HomeContainer = ({ data, isFetching }) => {
  return (
    <div className="content__container" >
      {
        data.category === "characters" ? <Heros heros={data} />
          : data.category === "comics" ? <Comics comics={data} /> : ""
      },
      {
        isFetching ? <Loader /> : ""
      },
      {
        data.category === undefined && !isFetching ?
        <p className="home_message" >SELECT A CATEGORY</p> : null
      }
    </div>
  )
};

const mapStateToProps = state => {
  return {
    data: state.actualPage,
    isFetching: state.actualPage.isFetching
  }
}

export default connect(mapStateToProps, null)(HomeContainer);