import React, { Component } from 'react';

class AddSong extends Component {
  render() {
    return (
		<li className="list-group-item">
			<span className="input-group">
				<input type="text" className="form-control song-name" placeholder="Add a Song" />
				<span className="input-group-btn"><button className="btn btn-default add" type="button">Add</button></span>
			</span>
		</li>
    );
  }
}

export default AddSong;
