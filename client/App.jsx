import React from 'react';
import ReactDOM from 'react-dom';
import QuestionsAnswers from './components/QA/QuestionsAnswers.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <p>Hello World!!!</p>
        </div>
        <QuestionsAnswers />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));