import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Icon } from 'antd';


const Decks = ( { match, decks } ) => {
  let cards;

  if ( decks ) {
  
    cards = decks.map( ( deck ) => {
      return <div key={ deck.id }>
        <Col span={ 8 } xs={ 24 } md={ 8 }>
          <Card 
            title={ deck.name } 
            extra={
              <span>
                <Link to={`${match.url}/${deck.id}`}><Icon type="select" /></Link>
                <a className="trash"><Icon type="delete" /></a>
              </span>
            }>
            { deck.desc }
            <br />
            Cards: { deck.count }
          </Card>
        </Col>
      </div>
    } );
  }

  return (  
    <div>
      <Row>
        <Col span={ 24 }>
          <h1>Decks</h1>
        </Col>
      </Row>
      <Row gutter={ 16 }>
        { cards }
      </Row>
    </div>
  );
};

export default Decks;