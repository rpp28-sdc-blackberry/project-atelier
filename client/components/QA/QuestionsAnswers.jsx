import React from 'react';
import getNextQuestionsAndAnswers from './controllers.js';
import QAContainer from './components/QAContainer.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.queryPage = 1;
    this.moreQuestionsExist = true;
    this.state = {
      questions: []
    };

  }

  componentDidMount() {

    getNextQuestionsAndAnswers(5)
      .then((results) => {
        console.log('empty results:', results.results);
        if (!results.results[2]) {
          console.log('logic works');
          this.moreQuestionsExist = false;
          console.log('this.moreQuestionsExist:', this.moreQuestionsExist);
        }
        this.setState({
          questions: results.results.slice(0, 2)
        });
      })
      .then(() => {
        console.log('this.state.questions: ', this.state.questions);
        this.queryPage++;
        console.log(this.queryPage);
      });

  }


  render() {
    return (
      <div>
        <div>QUESTIONS AND ANSWERS COMPONENT</div>
        <QAContainer questions={this.state.questions}/>
      </div>
    );
  }
}

export default QuestionsAnswers;