/**
 * @jest-environment jsdom
 */

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import QuestionsAnswers from './QuestionsAnswers.jsx';
import QuestionsList from './components/QuestionsList.jsx';
import AnswersList from './components/AnswersList.jsx';
import Question from './components/Question.jsx';
import Answer from './components/Answer.jsx';

describe('Questions and Answers module', () => {
  it('should exist', () => {
    expect(<QuestionsAnswers />).toBeTruthy;
  });
  it('renders top-level Q + A component', () => {
    render(<QuestionsAnswers />);
  });
  it('renders Questions List Component', () => {
    render(<QuestionsList questions={[]} name={''}/>);
  });
  it('renders Answers List Component', () => {
    render(<AnswersList answers={[]} />);
  });
  xit('renders a Question', () => {
    render(<Question />);
  });
  xit('renders an Answer', () => {
    render(<Answer />);
  });

});
