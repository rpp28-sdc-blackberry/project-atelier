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
      <div className="qa-modal" onClick={this.props.closeQuestionModal}>
        <div className="qa-modal-content" onClick={e => e.stopPropagation()}>
          <img onClick={this.props.closeQuestionModal} width="20px" height="20px" src="/images/close.png" />
          <div className="qa-modal-header">
            <h4 className="qa-modal-title"> ASK YOUR QUESTION </h4>
            <h5 className="qa-modal-title"> {`About the ${this.props.name}`} </h5>
          </div>
          <div className="qa-modal-body">
            <form className="qa-modal-form" onSubmit={this.props.handleQuestionSubmit}>
              <label>
                Your Question*
                <br />
                <textarea maxlength="1000" cols="50" rows="10" name="question" value={this.state.question} onChange={this.handleChange}/>
              </label>
              <br />
              <label>
                What Is Your Nickname?*
                <br />
                <input
                  maxlength="60" size="60" name="nickname" value={this.state.nickname} onChange={this.handleChange} placeholder="Example: jackson11!"
                />
                <br />
                <small> For privacy reasons, do not use your full name or email address </small>
              </label>
              <br />
              <label>
                Your Email*
                <br />
                <input
                  maxlength="60" size="60" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Example: jack@email.com"
                />
                <br />
                <small> For authentication reasons, you will not be emailed </small>
              </label>
              <br />
              <input className="qa-button" type="submit" value="SUBMIT QUESTION"/>
            </form>
          </div>
        </div>
      </div>
    );

  }
}

export default QuestionForm;