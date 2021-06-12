import React from 'react';

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
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
      <div className="qa-modal" onClick={this.props.closeAnswerModal}>
        <div className="qa-modal-content" onClick={e => e.stopPropagation()}>
          <div className="qa-modal-header">
            <h4 className="qa-modal-title"> SUBMIT YOUR ANSWER </h4>
            <h5 className="qa-modal-title"> {`${this.props.name}: ${this.props.question}`} </h5>
          </div>
          <div className="qa-modal-body">
            <form onSubmit={this.props.handleAnswerSubmit}>
              <label>
                Your Answer*
                <br />
                <textarea name="answer" value={this.state.answer} onChange={this.handleChange}/>
              </label>
              <br />
              <label>
                What Is Your Nickname?*
                <br />
                <input
                  name="nickname" value={this.state.nickname} onChange={this.handleChange} placeholder="Example: jack543!"
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
              <input type="submit" value="Submit Answer"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AnswerForm;