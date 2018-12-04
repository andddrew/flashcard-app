import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import firebase, { auth, provider } from './firebase.js';

import Sidebar from './components/Sidebar';
import Decks from './components/Decks';
import Deck from './components/Deck';
import Home from './components/Home';
import './App.css';

const { Footer, Sider, Content } = Layout;


class App extends Component {

  state = {
    collapsed: false,
    user: null,
    decks: [],
  }

  componentDidMount() {
    auth.onAuthStateChanged( ( user ) => {
      if ( user ) {
        const decksRef = firebase.database().ref( 'decks' );
        decksRef.on( 'value', snapshot => {
          let decks = snapshot.val();
          let newState = [];
          for ( let deck in decks ) {
            newState.push( {
              id: deck,
              name: decks[deck].name,
              desc: decks[deck].description,
              count: decks[deck].count,
            } );
          }
          this.setState( {
            user,
            decks: newState
          } );
        })
      }
    } );
  }

  login = () => {
    auth.signInWithPopup( provider )
      .then( ( result ) => {
        const user = result.user;
        this.setState( {
          user
        } );
      } );
  }

  logout = () => {
    auth.signOut()
      .then( () => {
        this.setState( {
          user: null
        } );
      } );
  }

  toggle = () => {
    this.setState( (prevState) => {
      return {
        collapsed: !prevState.collapsed,
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Sider 
            width={ 300 } 
            theme="light" style={{ border: "1px solid #eee" }}
            breakpoint="lg"
            collapsedWidth="0"
          >
            <Sidebar 
              user={ this.state.user }
              login={ this.login }
              logout={ this.logout }
            />
          </Sider>
          <Layout>
            <Content style={{ backgroundColor: 'white' }}>
              <Switch>
                <Route path='/decks/:deckId' component={ Deck } />
                <Route path='/decks' render={ ( { match } ) => <Decks decks={ this.state.decks } match={ match } /> } />
                <Route path='/' component={ Home } />
              </Switch>
            </Content>
            <Footer style={{ backgroundColor: 'white' }}></Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
