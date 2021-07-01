import React from 'react';
import FontAwesome from 'react-fontawesome';

class DropdownTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
      name: this.props.selectName
    };
    
    this.toggleList = this.toggleList.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }
  
  toggleList() {
    this.setState({
      isListOpen: !this.state.isListOpen
    });
  }

  selectItem(e) {
    e.stopPropagation();
    console.log('e: ', e);
    this.setState({
      headerTitle: e.target.id,
      isListOpen: !this.state.isListOpen
    });
    this.props.resetThenSet(e.target.id);
  }

  render() {
    return (
      <div className={`addtobag-${this.state.name}-dd-wrapper`}>
        <button 
          className={`addtobag-${this.state.name}-dd-header`}
          onClick={this.toggleList}
        >
          <div className={`addtobag-${this.state.name}-dd-header-title`}>{this.props.title}</div>
          {this.state.isListOpen ? <FontAwesome className="addtobag-dd-icon" name="angle-up" size="2x" />
            : <FontAwesome className="addtobag-dd-icon" name="angle-down" size="2x" />}
        </button>
        {this.state.isListOpen && (
          <div className={`addtobag-${this.state.name}-dd-list`}>
            {this.props.list.map((item) =>
              <button 
                id={item} 
                className={`addtobag-${this.state.name}-dd-list-item`}
                onClick={(e) => this.selectItem(e)}>
                {item}
                {'  '}
                {item.selected && <FontAwesome name="check" />}
              </button>          
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DropdownTemplate;