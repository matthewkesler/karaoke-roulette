import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import firebase from 'firebase';
import SongList from './SongList.js';
import Spinner from './Spinner.js';

/**
 * Main Container Component
 */
class Roulette extends Component {
   constructor (props) {
      super(props);
      this.state = {
         songs: []
      };
   }
   componentDidMount() {
      var _this = this;

      // Initialize Firebase
      var config = {
         apiKey: "AIzaSyC3nKm9rdO8p8AKUN-TmamT_T2zNtczgqM",
         authDomain: "karaoke-roulette-f3c5a.firebaseapp.com",
         databaseURL: "https://karaoke-roulette-f3c5a.firebaseio.com",
         storageBucket: "",
         messagingSenderId: "736491394972"
      };
      firebase.initializeApp(config);

      // Get list of songs
      fetch("http://sample-env-1.m4x8k3smkn.us-west-2.elasticbeanstalk.com/songs").then(response => {
         return response.json();
      }).then(songs => {
         _this.setState({songs: songs});
      });
   }
   handleAdd(song) {
      var songs = this.state.songs;
      // Make sure we don't already have it
      if(song && songs.indexOf(song) === -1) {
         // Auth with super secret edit key
         fetch("http://sample-env-1.m4x8k3smkn.us-west-2.elasticbeanstalk.com/auth?key=" + this.state.secretKey).then(response => {
            return response.json();
         }).then(authed => {
            if(authed) {
               // Add it to Firebase
               songs.push(song);
               firebase.database().ref('songs').set(songs);
               this.setState({
                  songs: songs,
                  spinnerMessage: ''
               });
            } else {
               this.setState({
                  spinnerMessage: 'Incorrect Secret Key!',
                  urgency: 'danger'
               });
            }
         });
      }
   }
   handleRemove(song) {
      var songs = this.state.songs;
      // Auth with super secret edit key
      fetch("http://sample-env-1.m4x8k3smkn.us-west-2.elasticbeanstalk.com/auth?key=" + this.state.secretKey).then(response => {
         return response.json();
      }).then(authed => {
         if(authed) {
            // Remove from Firebase
            songs.splice(songs.indexOf(song), 1);
            firebase.database().ref('songs').set(songs);
            this.setState({
               songs: songs,
               spinnerMessage: ''
            });
         } else {
            this.setState({
               spinnerMessage: 'Incorrect Secret Key!',
               urgency: 'danger'
            });
         }
      });
   }
   handleKeyChange(e) {
      this.setState({
         secretKey: e.target.value
      });
   }
   handleSpin() {
      // Get a random song
      var index = Math.floor(Math.random() * this.state.songs.length);
      this.setState({
         spinnerMessage: this.state.songs[index],
         urgency: 'success'
      });
   }
   render() {
      return (
         <div>
            <Spinner
               onSpin={() => this.handleSpin()}
               message={this.state.spinnerMessage}
               urgency={this.state.urgency}
            />

            <SongList
               songs={this.state.songs}
               onAdd={(song) => this.handleAdd(song)}
               onRemove={(song) => this.handleRemove(song)}
            />

            <label htmlFor="secretKey">Enter the super secret key to add/remove songs:</label>
            <input id="secretKey" type="text" className="form-control" placeholder="Secret Key" onChange={(e) => this.handleKeyChange(e)} />
         </div>
      );
   }
}

export default Roulette;
