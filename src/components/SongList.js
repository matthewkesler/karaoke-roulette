import React, { Component } from 'react';
import AddSong from './AddSong.js';

class SongList extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
   render() {
   	return (
   		<ul className="list-group">
        		<AddSong
        			onAdd={(song) => this.props.onAdd(song)}
        		/>
        		{this.props.songs.slice(0).reverse().map(song => {
        			return <li key={song} className="list-group-item">
        				<span className="badge remove" onClick={(e) => this.props.onRemove(song)}><span className="glyphicon glyphicon-remove remove"/></span>
        				<span className="name">{song}</span>
        			</li>;
        		})}
        	</ul>
    	);
  	}
}

export default SongList;
