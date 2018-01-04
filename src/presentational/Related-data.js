import React from 'react';
import './Related-data.css';

const RelatedData = ({displayRelatedData, closeTab}) => {
  const data = displayRelatedData;
  return (
    <div className={data.displayed ? "related" : "relatedHidden"}>
      <div className="escape_window" onClick={closeTab} >
        <span id="left" ></span>
        <span id="right" ></span>
      </div>  
      <div className={data.displayed ? "frameI" : ""}>
        <img src={data.data ? `${data.data.thumbnail.path}.${data.data.thumbnail.extension}`:null} />
      </div>
      <div className="wrapper name" >
        <p className="text" id="name" >{data.data ? data.data.title || data.data.name:null}</p>
      </div>
      <div className="section" >
        <hr />
      </div>  
      <div className="wrapper description" >
        <p className="text" id="description" >{data.data?data.data.description:"Description missing..."}</p>
      </div>
      <div className="frame_description" ></div>
    </div>
  )
}

export default RelatedData;