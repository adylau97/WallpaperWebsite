import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ImgList from './components/ImgList';
import Navbar from './components/Navbar';
import FavoriteList from './components/FavoriteList';


class App extends Component {

  constructor(){
    super();
    this.state = {
      url: [],
      loadingState: true,
      page: 1,
      search:'nature',
      getFavorite: [],
      addFav:'',
      removeFav:''
    };
  }

  componentDidMount(){
   /* axios.get('http://localhost:5000/getImage')
    axios.get('https://pixabay.com/api/?key=10095037-097333a2362dace817e1654de')
    .then(json => json.data.map(result =>(
      {
        url : result.largeImageURL
      }
    )))
    .then(newData=> this.setState({url: newData, loadingState: false}))
    .catch(error => alert(error))*/

    this.performSearch();
    this.getFavorite();
    document.addEventListener('scroll',this.trackScrolling);
  }

  componentDidUpdate(){
    this.getFavorite();
  }

  componentWillUnmount(){
    document.removeEventListener('scroll',this.trackScrolling);
  }

  isBottom(el){
    return el.getBoundingClientRect().bottom <= window.outerHeight;
  }

  trackScrolling = () =>{
    const wrappedElement = document.getElementById('container');
    if(wrappedElement === null){
    }else{
      if(this.isBottom(wrappedElement)){
        this.performSearch();
      }
    }
  }

  query = e => {
    this.state.search = e;
    this.state.url=[];
    this.state.page=1;
    //this.state.loadingState=true;
    this.setState({loadingState:true });
    this.performSearch();
  };

  queryFav = e => {
    this.state.addFav = e;
    //alert(this.state.addFav);
    //alert("OK");
    this.addFavorite();
    alert("Image had been added to Favorite!");
  };

  queryFavRemove = e => {
    this.state.removeFav = e;
    //alert(this.state.removeFav);
    //alert("OK");
    this.removeFavorite();
    alert("Image had been removed from Favorite!");
  };

  performSearch = () => {
    
    const url = `/getImage/${this.state.page}/${this.state.search}`;
    console.log(url);
    axios.get(url)
    /*
    .then(json => json.data.map(result =>(
      {
        url : result.largeImageURL
      }
    )))
    .then(newData=> this.setState({url: newData, loadingState: false}))
    .catch(error => alert(error))*/

    .then(response =>{
      console.log(response.data);
      var joinedArray = this.state.url.concat(response.data);
      this.setState({url: joinedArray, loadingState:false});
    })
    .catch(error => {
      alert(error);
      alert("Please enter keyword for search!!!");
      this.state.search = 'nature';
      this.state.url=[];
      this.state.page=1;
      //this.state.loadingState=true;
      this.setState({loadingState:true });
      this.performSearch();
    })

    this.setState({page: this.state.page+1});
    //this.state.page = this.state.page + 1; 
  };
  
  getFavorite=()=>{
    const url = `/getFavorite`;
    axios.get(url)
    .then(response=>{
      console.log(response.data);
      this.setState({getFavorite: response.data});
    })
    .catch(error => {
      alert(error);
    })
  };

  addFavorite=()=>{
    const url = `/addFavorite`;
    axios({method:'post',url:url,data:{url: this.state.addFav}});
  };

  removeFavorite=()=>{
    const url = `/removeFavorite`;
    axios({method:'post',url:url,data:{id: this.state.removeFav}});
  }

  render() {
    return (
     <Router>
      <div id="container">
        <Navbar onSearch={this.query}/>
        <Route path="/favorite" render={()=><FavoriteList url = {this.state.getFavorite} onClick={this.queryFavRemove}/>}/>
        <Route exact path="/" render={()=>this.state.loadingState ?<p>Loading...</p> :<ImgList url = {this.state.url}  onClick={this.queryFav}/>}/>
      </div>
     </Router>

    /* <div>
				<div className="main-header">
					<div className="inner">
						<h1 className="main-title">ImageSearch</h1>
					</div>
				</div>
				<div className="main-content">
					<ImgList url={this.state.url} />
				</div>
      </div>*/
      
    );
  }
}

export default App;
