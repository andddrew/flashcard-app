import React from 'react';
import { Row, Col } from 'antd';

const Home = ( props ) => (
  <div>
    <Row>
      <Col span={ 24 }><h1>Flashcards</h1></Col>
      <Col span={ 18 } offset={ 3 }>
        <h3>How it works.</h3>
        <p>Flashcards uses the learning technique known as <strong>Spaced Repetition</strong>.</p>
        <p>More specifically, it uses the Leitner System to improve efficiency in learning.</p>
        <p>Spaced repetition is a proven study method that incorporates increasing intervals of time between subsequent review of previously learning material in order to exploit the psychological spacing effect.  "Flashcards" are sorted into groups according to how well the learner knows each one.  The learners then try to recall the solution written on each flashcard.  If they succeed, the card will be transferred over to the next group.  If they fail, the card will remain or sent back to the previous group.  With each success of a card equals a longer period before that card will reappear again.  Once all cards have reached the final group has the learner succeeded in memorizing every card.</p>
        <img src='../assets/images/leitner.jpg' alt="Leitner" />
      </Col>
    </Row>
  </div>
);

export default Home;

