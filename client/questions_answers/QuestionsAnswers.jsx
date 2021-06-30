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
      showMoreAnsweredQuestionsButton: false,
      renderedQuestions: [],
      remainingQuestions: [],
      searchResults: null,
      showSearch: false,
      query: '',
      showQuestionModal: false

    };

    this.handleMoreQuestionsClick = this.handleMoreQuestionsClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.closeQuestionModal = this.closeQuestionModal.bind(this);

  }

  componentDidMount() {
    // initialize localStorage
    if (!localStorage.getItem('helpfulQuestions')) {
      localStorage.setItem('helpfulQuestions', JSON.stringify([]));
    }

    if (!localStorage.getItem('helpfulAnswers')) {
      localStorage.setItem('helpfulAnswers', JSON.stringify([]));
    }
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product_id !== this.props.product_id) {
      this.initialize();
    }
  }

  initialize() {

    fetchQuestions(this.props.product_id, 100, 1)
      .then((data) => {
        let questions = data.results;
        if (!questions.length) {
          this.setState({
            showMoreAnsweredQuestionsButton: false,
            showSearch: false
          });
        } else if (questions.length < 3) {
          this.setState({
            renderedQuestions: questions,
            showSearch: true,
            showMoreAnsweredQuestionsButton: false
          });
        } else {
          this.setState({
            renderedQuestions: questions.slice(0, 2),
            remainingQuestions: questions.slice(2),
            showMoreAnsweredQuestionsButton: true,
            showSearch: true
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  closeQuestionModal() {
    this.setState({
      showQuestionModal: false
    });
  }

  handleMoreQuestionsClick() {

    let nextTwoQuestionsToRender = this.state.remainingQuestions.slice(0, 2);
    let remainingQuestions = this.state.remainingQuestions.slice(2);
    this.setState({
      renderedQuestions: [...this.state.renderedQuestions, ...nextTwoQuestionsToRender],
      remainingQuestions: remainingQuestions,
      showMoreAnsweredQuestionsButton: remainingQuestions.length ? true : false
    });

  }

  handleSearch(e) {

    let query = e.target.value;
    if (query.length < 3) {
      this.setState({
        query: query,
        searchResults: null,
        showMoreAnsweredQuestionsButton: true
      });
    } else {
      let searchResults = JSON.parse(JSON.stringify(this.state.renderedQuestions));
      searchResults = searchResults.filter((question) => question.question_body.includes(query));

      searchResults.forEach((question) => {
        question.question_body = (
          <span dangerouslySetInnerHTML={{__html: question.question_body.split(query).join(`<mark>${query}</mark>`)}}></span>
        );
      });

      this.setState({
        query: query,
        searchResults: searchResults,
        showMoreAnsweredQuestionsButton: false
      });
    }

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

    return (
      <div id="qa-component">
        <h5 className="qa-heading"> {`QUESTIONS & ANSWERS`} </h5>
        {this.state.showSearch && <Search query={this.state.query} handleSearch={this.handleSearch}/>}
        <QuestionsList questions={this.state.searchResults || this.state.renderedQuestions} name={this.props.name}/>
        {this.state.showMoreAnsweredQuestionsButton && <button className="qa-button" onClick={this.handleMoreQuestionsClick}>MORE ANSWERED QUESTIONS</button>}
        <button className="qa-button" onClick={this.handleAddQuestionClick}>ADD A QUESTION +</button>
        {this.state.showQuestionModal && <QuestionForm name={this.props.name} handleQuestionSubmit={this.handleQuestionSubmit} closeQuestionModal={this.closeQuestionModal}/>}
      </div>
    );

  }

}

export default QuestionsAnswers;