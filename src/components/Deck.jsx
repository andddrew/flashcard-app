import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Popconfirm } from 'antd';
import firebase from '../firebase.js';
import uuid from 'uuid';
import CardList from './CardList';

const { TextArea } = Input;


class Deck extends Component {
  state = {
    deckInfo: [],
    deck: [],
    front: "",
    back: "",
  };

  componentWillMount() {
    this.decksRef = firebase.database().ref("decks");
    this.countDeck = firebase.database().ref('decks/' + this.props.match.params.deckId);
    this.decksRef.on("value", snapshot => {
      let decks = snapshot.val();
      this.setState({
        deckInfo: decks[this.props.match.params.deckId]
      });
    });
    this.deckRef = firebase.database().ref(this.props.match.params.deckId);
    this.deckRef.on("value", snapshot => {
      if (snapshot.val()) {
        const deck = Object.values( snapshot.val() );
        this.setState({
          deck
        });
      }
    });
  }

  onChangeFront = e => {
    this.setState({ front: e.target.value });
  };
  onChangeBack = e => {
    this.setState({ back: e.target.value });
  };

  handleAddCard = () => {
    let newCount = this.state.deck.length + 1;
    this.countDeck.update( {
      count: newCount
    } );

    const newCard = {
      front: this.state.front,
      back: this.state.back
    };

    const deck = [ ...this.state.deck, newCard ];

    this.currDeck = firebase.database().ref(this.props.match.params.deckId);
    this.currDeck.push( newCard );
    this.setState( {
      deck,
      front: '',
      back: '',
    });
  };

  handleDeleteCard = ( front ) => {
    console.log( front );
    this.delCard = firebase.database().ref( this.props.match.params.deckId );
    this.delCard.orderByChild( 'front' ).equalTo( front ).on( 'value', snapshot => {
      const updates = {};
      snapshot.forEach( child => updates[ child.key ] = null );
      this.delCard.update( updates );
    })

    let newCount = this.state.deck.length - 1;
    this.countDeck.update( {
      count: newCount
    } );
  }

  componentWillUnmount() {
    this.decksRef.off();
    this.deckRef.off();
  }

  render() {
    return (
      <div>
        <h1>{this.state.deckInfo.name}</h1>
        <Row>
          <Col xs={24} md={12}>
            <div>
              {/* text editor goes here */}
              <Form>
                <Input placeholder="Front" value={ this.state.front } onChange={this.onChangeFront} />
                <TextArea
                  value={ this.state.back }
                  placeholder="Back"
                  rows={10}
                  onChange={this.onChangeBack}
                />
                <Button onClick={this.handleAddCard}>Add</Button>
              </Form>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <CardList deck={ this.state.deck } deleteCard={ this.handleDeleteCard } />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Deck;