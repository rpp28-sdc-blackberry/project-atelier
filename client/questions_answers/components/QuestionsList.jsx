import React from 'react';
import Question from './Question.jsx';

const QuestionsList = (props) => (
  <div className="qa-questions-list-container">
    {props.questions.map((question) => <Question
      key={question.question_id}
      question={question.question_body}
      answers={question.answers}
      question_id={question.question_id}
      name={props.name}
      handleAddAnswerClick={props.handleAddAnswerClick}
    />)}
  </div>

);

export default QuestionsList;