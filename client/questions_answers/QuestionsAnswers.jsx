import React from 'react';
import { fetchQuestions, submitQuestion } from './controllers.js';
import Search from './components/Search.jsx';
import QuestionsList from './components/QuestionsList.jsx';
import QuestionForm from './components/QuestionForm.jsx';
import Modal from './components/Modal.jsx';

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

    this.handleMoreQuestionsClick = this.handleMoreQuestionsClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.closeQuestionModal = this.closeQuestionModal.bind(this);

  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {

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
  }

  closeQuestionModal() {
    this.setState({
      showQuestionModal: false
    });
  }

  handleMoreQuestionsClick() {
    // these functions are too tightly coupled, will refactor
    // this updates state for search--refactor to a different function
    if (this.state.hasSearched) {
      this.state.questions = this.questionsToSearch;
      this.questionsToSearch = [];
      this.setState({
        hasSearched: false,
        query: ''
      });
    }

    // this updates the questions list--refactor to different function
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

    // validate the form fields using a helper function that returns a boolean value
    // if that doesnt pass--display an alert popup
    // otherwise
    // submit the question to the server using a function

    submitQuestion(e.target.question.value, e.target.nickname.value, e.target.email.value, this.state.product_id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      showQuestionModal: false
    });

  }

  render() {
    if (this.props.info) {
      return (
        <div className="qa-component">
          <div> {`QUESTIONS & ANSWERS`} </div>
          {this.state.showSearch && <Search query={this.state.query} handleSearch={this.handleSearch}/>}
          <QuestionsList questions={this.state.questions} name={this.props.info.name}/>
          {this.state.showMoreAnsweredQuestionsButton && <button onClick={this.handleMoreQuestionsClick}>MORE ANSWERED QUESTIONS</button>}
          <button onClick={this.handleAddQuestionClick}>ADD A QUESTION</button>
          {this.state.showQuestionModal && <QuestionForm name={this.props.info.name} handleQuestionSubmit={this.handleQuestionSubmit} closeQuestionModal={this.closeQuestionModal}/>}
        </div>
      );
    }
    return (
      <div className="qa.component"></div>
    );
  }

}

export default QuestionsAnswers;