import React from 'react';
import fetchQuestions from './controllers.js';
import Search from './components/Search.jsx';
import QuestionsList from './components/QuestionsList.jsx';
import QuestionForm from './components/QuestionForm.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.queryPage = 3;

    this.state = {
      hasSearched: false,
      product_id: this.props.product_id,
      showMoreAnsweredQuestionsButton: false,
      showSearch: false,
      nextTwoQuestions: [],
      query: '',
      questions: [],
      showQuestionModal: false
    };

    fetchQuestions(this.props.product_id, 4, 1)
      .then((data) => {
        let firstTwoQuestions = data.results.slice(0, 2);
        let nextTwoQuestions = data.results.slice(2);

        if (!firstTwoQuestions.length) {
          return;
        }
        if (!nextTwoQuestions.length) {
          this.setState({
            showSearch: true,
            questions: firstTwoQuestions
          });
          return;
        }

        this.setState({
          showMoreAnsweredQuestionsButton: true,
          showSearch: true,
          nextTwoQuestions: nextTwoQuestions,
          questions: firstTwoQuestions
        });

      });

    this.updateQuestionsList = this.updateQuestionsList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);

  }

  // make a "handle more questions button click" function
  updateQuestionsList() {

    // move to a different function
    if (this.state.hasSearched) {
      this.state.questions = this.questionsToSearch;
      this.questionsToSearch = [];
      this.setState({
        hasSearched: false,
        query: ''
      });
    }

    fetchQuestions(this.state.product_id, 2, this.queryPage)
      .then((data) => {
        if (!data.results.length) {
          this.setState({
            showMoreAnsweredQuestionsButton: false,
            questions: [...this.state.questions, ...this.state.nextTwoQuestions]
          });
        } else {
          this.setState({
            questions: [...this.state.questions, ...this.state.nextTwoQuestions],
            nextTwoQuestions: data.results,
          });
          this.queryPage++;
        }
      });

  }

  handleSearch(e) {

    if (!this.state.hasSearched) {
      this.questionsToSearch = this.state.questions.slice();
      this.state.hasSearched = true;
    }

    let query = e.target.value;

    if (query.length < 3) {
      this.setState({
        query: query,
        questions: this.questionsToSearch
      });
      return;
    }

    let queryResult = this.questionsToSearch.filter((question) => question.question_body.includes(query));

    this.setState({
      query: query,
      questions: queryResult
    });

  }

  handleAddQuestionClick() {
    this.setState({
      showQuestionModal: true
    });
  }

  handleQuestionSubmit(e) {
    e.preventDefault();

    // prevent default form submit behavior

    // validate the form fields using a helper function that returns a boolean value

    // if that doesnt pass--display an alert popup

    // otherwise

    // submit the question to the server using a function

    // hide the modal
    this.setState({
      showQuestionModal: false
    });
  }

  render() {

    return (
      <div className="questions-answers component">
        <div> {`QUESTIONS & ANSWERS`} </div>
        {this.state.showSearch && <Search query={this.state.query} handleSearch={this.handleSearch}/>}
        <QuestionsList questions={this.state.questions}/>
        {this.state.showMoreAnsweredQuestionsButton && <button onClick={this.updateQuestionsList}>MORE ANSWERED QUESTIONS</button>}
        <button onClick={this.handleAddQuestionClick}>ADD A QUESTION</button>
        {this.state.showQuestionModal && <QuestionForm handleQuestionSubmit={this.handleQuestionSubmit}/>}
      </div>
    );
  }

}

export default QuestionsAnswers;