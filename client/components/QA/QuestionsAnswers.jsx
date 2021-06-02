import React from 'react';
import getNextTwoQuestionsAndAnswers from './controllers.js';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

    getNextTwoQuestionsAndAnswers(1)
      .then((results) => {
        console.log(results);
      });

  }


  render() {
    return (
      <div>QUESTIONS AND ANSWERS COMPONENT</div>
    );
  }
}

export default QuestionsAnswers;