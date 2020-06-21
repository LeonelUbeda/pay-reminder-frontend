import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { findAndUpdateGroup } from "../../localStorage/groups";
import PropTypes from 'prop-types'

class EditGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.group.id, // delete thissss
      name: props.group.name,
    };
    this.deleteGroup = this.deleteGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
  }

  deleteGroup() {
    this.props.group.delete(); 
  }

  updateGroup() {
    this.props.group.name = this.state.name
    this.props.group.update().then(() => {
      this.props.toggleEditMode();
    })
    
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="pt-2 pb-4 flex flex-col">
        <div className="flex flex-col">
          <div className="flex">
            <span onClick={this.props.toggleEditMode}className="mb-3 cursor-pointer py-1">
              Back
            </span>
            <span
              onClick={this.deleteGroup}
              className="mb-3 ml-auto py-1 cursor-pointer"
            >
              🗑️Delete
            </span>
          </div>
          <span className="text-lg mb-2">
            Group name &nbsp;
            <span className="text-xs">
              Example: &nbsp;
              <span className="text-red-600">Entertainment </span>
            </span>
          </span>
        </div>

        <input
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
          type="text"
          autoComplete="off"
          className="default-input"
        />

        <button
          onClick={this.updateGroup}
          className="mt-3 ml-auto py-1"
        >
          💾Save
        </button>
      </div>
    );
  }
}

EditGroup.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  deleteGroup: PropTypes.func.isRequired,
  updateGroupFromState: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired
}


export default connect([], actions)(EditGroup) //(({group, toggleEditMode, updateGroupFromState, deleteGroup}) =>
