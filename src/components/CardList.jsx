import React from 'react';
import uuid from 'uuid';
import { List, Button, Skeleton, Popconfirm } from 'antd';

const CardList = ( { deck, deleteCard } ) => {
  let cardList;
  if ( deck === 0 ) {
    cardList = <p>Empty. Add a new card.</p>;
  } 
  else {
    cardList = deck.map( card => {
      return <li key={ uuid.v4() }>{ card.front }</li>;
    });
  }
  return (
    <div>
      <h3>Card Lists</h3>
      <List
        bordered
        dataSource={ deck }
        renderItem={ card => (
          <List.Item 
            actions={[<a onClick={ () => alert("hi")}>edit</a>, <a onClick={ () => deleteCard( card.front ) }>delete</a>]}>
            { card.front }
          </List.Item>
        ) }
      />
    </div>
  );

}

export default CardList;