import React from 'react';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';
import { submitAnswer } from '../controllers.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswerModal: false,
    };
    this.handleAddAnswerClick = this.handleAddAnswerClick.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  handleAddAnswerClick() {
    this.setState({
      showAnswerModal: true
    });
  }

  handleAnswerSubmit(e) {

    e.preventDefault();

    // validate the form fields using a helper function that returns a boolean value
    // if that doesnt pass--display an alert popup
    // otherwise

    submitAnswer(e.target.answer.value, e.target.nickname.value, e.target.email.value, this.props.question_id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      showAnswerModal: false
    });
  }

  render() {

    return (
      <div className="qa-item">
        <b> {`Q: ${this.props.question}`} </b>
        <button onClick={this.handleAddAnswerClick}> Add Answer </button>
        {this.state.showAnswerModal && <AnswerForm
          question={this.props.question}
          name={this.props.name}
          handleAnswerSubmit={this.handleAnswerSubmit}
        />}
        <AnswersList answers={this.props.answers}/>
      </div>
    );

  }

}

export default Question;