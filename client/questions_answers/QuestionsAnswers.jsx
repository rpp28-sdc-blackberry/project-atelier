import React from 'react';
import { fetchQuestions, submitQuestion } from './controllers.js';
import Search from './components/Search.jsx';
import QuestionsList from './components/QuestionsList.jsx';
import QuestionForm from './components/QuestionForm.jsx';
import Modal from './components/Modal.jsx';
import { validateFormFields } from './helpers.js';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSearched: false,
      showMoreAnsweredQuestionsButton: false,
      showSearch: false,
      nextTwoQuestions: [],
      query: '',
      queryPage: 3,
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

  componentDidUpdate(prevProps) {
    if (prevProps.product_id !== this.props.product_id) {
      this.initialize();
    }
  }

  initialize() {
    // initialize localStorage
    if (!localStorage.getItem('helpfulQuestions')) {
      localStorage.setItem('helpfulQuestions', JSON.stringify([]));
    }

    if (!localStorage.getItem('helpfulAnswers')) {
      localStorage.setItem('helpfulAnswers', JSON.stringify([]));
    }

    fetchQuestions(this.props.product_id, 4, 1)
      .then((data) => {
        let firstTwoQuestions = data.results.slice(0, 2);
        let nextTwoQuestions = data.results.slice(2);

        if (!firstTwoQuestions.length) {
          // make sure the state is empty if there are no questions
          this.setState({
            hasSearched: false,
            showMoreAnsweredQuestionsButton: false,
            showSearch: false,
            nextTwoQuestions: [],
            query: '',
            queryPage: 3,
            questions: [],
            showQuestionModal: false
          });

        } else if (!nextTwoQuestions.length) {
          this.setState({
            hasSearched: false,
            showSearch: true,
            questions: firstTwoQuestions,
            showMoreAnsweredQuestionsButton: false,
            nextTwoQuestions: [],
            query: '',
            queryPage: 3,
            showQuestionModal: false
          });

        } else {
          this.setState({
            hasSearched: false,
            showSearch: true,
            questions: firstTwoQuestions,
            showMoreAnsweredQuestionsButton: true,
            nextTwoQuestions: nextTwoQuestions,
            query: '',
            queryPage: 3,
            showQuestionModal: false
          });
        }
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
    fetchQuestions(this.props.product_id, 2, this.state.queryPage)
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
          this.state.queryPage = this.state.queryPage + 1;
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

    const question = e.target.question.value;
    const nickname = e.target.nickname.value;
    const email = e.target.email.value;

    const invalid = validateFormFields(question, nickname, email);

    if (invalid) {
      alert(invalid);
      return;
    }

    submitQuestion(question, nickname, email, this.props.product_id)
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