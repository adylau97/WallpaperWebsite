import React from 'react';
import App from '../App';



const Img = props => {

function handleSubmit(){
  props.onClick(props.url);
}


return(
<div className="col-lg-3 col-md-4 col-xs-6">
<a href={props.url} target="_blank" className="d-block mb-4 h-100">
  <img width="300" height="300" src={props.url} alt=""/>
</a>
<p/>
<p><button className="favorite" type="submit" onClick={handleSubmit}><i className="fa fa-star" aria-hidden="true"></i></button></p>
</div>
);
};

export default Img;


