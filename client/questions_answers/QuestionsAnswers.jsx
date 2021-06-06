import React from 'react';
import getNextQuestionsAndAnswers from './controllers.js';
import QuestionsList from './components/QuestionsList.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.queryPage = 2; // set to 2 because of initialization function
    this.state = {
      showMoreAnsweredQuestionsButton: false,
      questions: []
    };

    this.updateQuestionsList = this.updateQuestionsList.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    // if there are at least 3 questions, show the button to enable fetch of more messages
    getNextQuestionsAndAnswers(3, 1)
      .then((results) => {
        if (results.results.length === 3) {
          this.setState({
            showMoreAnsweredQuestionsButton: true,
            questions: results.results.slice(0, 2)
          });
        }
      });
  }

  updateQuestionsList() {

    // first call to server checks to see if there will be any additional messages remaining after this fetch
    getNextQuestionsAndAnswers(2, this.queryPage + 1)
      .then((results) => {
        // if there aren't, hide the button
        if (results.results.length === 0) {
          this.setState({
            showMoreAnsweredQuestionsButton: false
          });
        }
      })
      .then(() => {
        return getNextQuestionsAndAnswers(2, this.queryPage);
      })
      .then((results) => {
        this.setState({
          questions: this.state.questions.concat(results.results)
        });
      })
      .then(() => {
        this.queryPage++;
      });

  }


  render() {
    return (
      <div className="questions-answers component">
        <div> {`QUESTIONS & ANSWERS`} </div>
        <QuestionsList questions={this.state.questions}/>
        {this.state.showMoreAnsweredQuestionsButton && <button onClick={this.updateQuestionsList}>MORE ANSWERED QUESTIONS</button>}
        <button onClick={() => console.log('add a new question by clicking this button')}>ADD A QUESTION</button>
      </div>
    );
  }
}

export default QuestionsAnswers;