import React from 'react';
import Answer from './Answer.jsx';

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: Object.values(props.answers)
    };
  }

  render() {

    return (

      <div className="answers-list container">
        <b>A:</b>
        {this.state.answers.map((answer) => <Answer key={answer.id} answer={answer} />)}
        <button> LOAD MORE ANSWERS </button>
      </div>

    );
  }
}

export default AnswersList;