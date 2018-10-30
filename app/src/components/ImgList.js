import React from 'react';
import './ImgList.css';
import Img from './Img'
import NoImgs from './NoImgs';



const ImgList = props =>{

  const results = props.url;
  let imgs;

  if(results.length>0){
   imgs = results.map(img => <Img url={img.largeImageURL} onClick={props.onClick}/>);
  } else{
   imgs = <NoImgs/>;
  }


  return(
    <div className="container">
    <div className="row text-center text-lg-left">
    {imgs}
    </div>
    </div>
  );
};

export default ImgList;