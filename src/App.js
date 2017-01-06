import React, { Component } from 'react';
import logoDesktop from './img/desktop.gif';
import logoMobile from './img/mobile.gif';
import SongList from './components/SongList.js';
import AddSong from './components/AddSong.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
         <h1>
         	<picture>
	 				<source srcSet={logoMobile} media="(max-width: 600px)"/>
	 				<source srcSet={logoDesktop} media="(min-width: 601px)"/>
	 				<img src={logoDesktop} alt="Karaoke Roulette"/>
				</picture>
         </h1>
		  	<ul className="list-group">
        		<AddSong />
        		<SongList />
        	</ul>
      </div>
    );
  }
}

export default App;
