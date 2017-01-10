import React, { Component } from 'react';

/**
 * Add a song to the list
 */
class AddSong extends Component {
   constructor(props) {
      super(props);
      this.state = {
         song: ''
      }
   }
   handleKeyDown(e) {
      if(e.key === "Enter") {
         this.props.onAdd(this.state.song);
      }
   }
   handleChange(e) {
      this.setState({
         song: e.target.value
      });
   }
   handleAdd(){
      this.props.onAdd(this.state.song);
   }
   render() {
      return (
         <li className="list-group-item">
            <span className="input-group">
               <input type="text" className="form-control song-name" placeholder="Add a Song" onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleKeyDown(e)}/>
               <span className="input-group-btn"><button onClick={() => this.handleAdd()} className="btn btn-default add" type="button">Add</button></span>
            </span>
         </li>
      );
   }
}

AddSong.propTypes = {
  onAdd: React.PropTypes.func,
};

export default AddSong;
