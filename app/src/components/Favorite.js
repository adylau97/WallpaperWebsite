import React from 'react';

const Favorite = props => {


  function handleSubmit(){
    props.onClick(props.url._id);
    //console.log(props.url._id);
    //alert(props._id);
  }

return(
<div className="col-lg-3 col-md-4 col-xs-6">
<a href={props.url.url} target="_blank" className="d-block mb-4 h-100">
  <img width="300" height="300" src={props.url.url} alt=""/>
</a>
<p/>
<p><button className="favorite" type="submit" onClick={handleSubmit}><i className="fa fa-trash" aria-hidden="true"></i></button></p>
</div>
);
};

export default Favorite;


