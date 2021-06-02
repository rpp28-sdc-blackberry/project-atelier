import React from 'react';
import getNextQuestionsAndAnswers from './controllers.js';
import QAContainer from './components/QAContainer.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.queryPage = 1;
    this.state = {
      showMoreAnsweredQuestionsButton: true,
      questions: []
    };

    this.updateQuestionsList = this.updateQuestionsList.bind(this);
  }

  componentDidMount() {
    this.updateQuestionsList();
  }

  updateQuestionsList() {
    // check to see if the next page on the server has questions
    getNextQuestionsAndAnswers(this.queryPage + 1)
      .then((results) => {
        if (results.results.length === 0) {
          this.setState({
            showMoreAnsweredQuestionsButton: false
          });
        }
      })
      .then(() => {
        return getNextQuestionsAndAnswers(this.queryPage);

      })
      .then((results) => {
        this.setState({
          questions: this.state.questions.concat(results.results.slice(0, 2))
        });
      })
      .then(() => {
        this.queryPage++;
      });

  }


  render() {
    return (
      <div>
        <div>QUESTIONS AND ANSWERS COMPONENT</div>
        <QAContainer questions={this.state.questions}/>
        {this.state.showMoreAnsweredQuestionsButton && <button onClick={this.updateQuestionsList}>more answered questions</button>}
      </div>
    );
  }
}

export default QuestionsAnswers;