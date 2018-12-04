import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase.js';
import { Menu, Button, Icon } from 'antd';

import CreateForm from './CreateForm';

class Sidebar extends Component {

  state = {
    visible: false,
  }

  showModal = () => {
    this.setState( {
      visible: true,
    } );
  }

  handleCancel = ( e ) => {
    this.setState( {
      visible: false,
    } );
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields( (err, values) => {
      if (err) {
        return;
      }
      const decksRef = firebase.database().ref('decks');
      const deck = {
        name: values.name,
        description: values.description,
        count: 0,
      };
      decksRef.push( deck );
      form.resetFields();
      this.setState( { visible: false } );
    } );
  }

  saveFormRef = ( formRef ) => {
    this.formRef = formRef;
  }

  render() {
    const btn = !this.props.user ? 
      <Button block={ true } onClick={ this.props.login }><Icon type="login" />Log In</Button> :
      <Button block={ true } onClick={ this.props.logout }><Icon type="logout" />Log Out</Button>;
    
    return (
      <div className="side-bar">
        <h1>Flashcards</h1>
        { this.props.user && <img className="profile-image" src={ this.props.user.photoURL } alt="Profile" /> }
        { btn }
        <Button type="primary" block={ true } onClick={ this.showModal }><Icon type="plus" />Create New Deck</Button>
        <CreateForm
          wrappedComponentRef={ this.saveFormRef }
          visible={ this.state.visible }
          onCancel={ this.handleCancel }
          onCreate={ this.handleCreate }
        />

        <Menu defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/"><Icon type="home" />Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/decks"><Icon type="profile" />Decks</Link></Menu.Item>
        </Menu>
      </div>
    );
  }
};

export default Sidebar;