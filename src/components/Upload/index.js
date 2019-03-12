import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {
  constructor () {
    super();
    this.state = {
      file: null,
      authUser: JSON.parse(localStorage.getItem('authUser')),
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response);
      console.log(response.data.Location);
      console.log('user ' + this.state.authUser.email)
    }).catch(error => {
      console.log('error' + error.message);
    });
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }

  render () {
    return (
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='submit'>Send</button>
      </form>
    );
  }
}


export default Upload;