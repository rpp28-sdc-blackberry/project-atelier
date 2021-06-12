import React from 'react';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname: '',
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {

    return (
      <div className="qa-modal">
        <div className="qa-modal-content">
          <div className="qa-modal-header">
            <h4 className="qa-modal-title"> ASK YOUR QUESTION </h4>
            <h5 className="qa-modal-title"> {`About the ${this.props.name}`} </h5>
          </div>
          <div className="qa-modal-body">
            <form onSubmit={this.props.handleQuestionSubmit}>
              <label>
                Your Question*
                <br />
                <textarea name="question" value={this.state.question} onChange={this.handleChange}/>
              </label>
              <br />
              <label>
                What Is Your Nickname?*
                <br />
                <input
                  name="nickname" value={this.state.nickname} onChange={this.handleChange} placeholder="Example: jackson11!"
                />
                <br />
                <small> For privacy reasons, do not use your full name or email address </small>
              </label>
              <br />
              <label>
                Your Email*
                <br />
                <input
                  name="email" value={this.state.email} onChange={this.handleChange} placeholder="Example: jack@email.com"
                />
                <br />
                <small> For authentication reasons, you will not be emailed </small>
              </label>
              <br />
              <input type="submit" value="Submit Question"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionForm;