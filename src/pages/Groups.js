import React from "react";
import CreateGroup from "../components/groups/CreateGroup";
import { connect } from "unistore/react";
import { actions } from "../store";
import GroupItem from "../components/groups/CroupItem";
import Group from '../Classes/Group'
import { deleteGroupAndUpdatePayments } from "../localStorage/groups";
import { DEFAULT_GROUP } from "../localStorage/defaultValues";
import PropTypes from 'prop-types'


class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatingGroup: false,
    };
    this.toggleIsCreatingGroup = this.toggleIsCreatingGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  deleteGroup(id) {
    deleteGroupAndUpdatePayments(id).then(() => {
      this.props.removeGroupFromState(id);
    });
  }

  toggleIsCreatingGroup() {
    this.setState({
      ...this.state,
      isCreatingGroup: !this.state.isCreatingGroup,
    });
  }

  render() {
    return (
      <div className="mt-5 px-4">
        {this.state.isCreatingGroup ? (
          <div>
            <div
              className="messages-bg rounded-md px-3 py-3 w-100 mb-3 text-lg cursor-pointer flex justify-center"
              onClick={this.toggleIsCreatingGroup}
            >
              <h2 className="title-primary-color font-semibold">Back</h2>
            </div>
            <CreateGroup toggleIsCreatingGroup={this.toggleIsCreatingGroup} />
          </div>
        ) : null}

        {!this.state.isCreatingGroup ? (
          <div
            className="messages-bg rounded-md px-3 py-3 w-100 my-3 text-lg cursor-pointer flex justify-around"
            onClick={this.toggleIsCreatingGroup}
          >
            <h2 className="title-primary-color font-semibold mx-auto text-center">
              Create Group
            </h2>
          </div>
        ) : null}

        {!this.state.isCreatingGroup
          ? this.props.groups.map((group) => {
              //Si es el grupo por default, no retorna nada.
              //O sea que no lo renderiza
              //No tiene sentido listar el grupo "sin grupo"
              //Para que editar o borrar?
              if (group.id === DEFAULT_GROUP.id) {
                return null;
              }
              return (
                <GroupItem
                  group={group}
                  key={group.getId()}
                  deleteGroup={this.deleteGroup}
                />
              );
            })
          : null}
      </div>
    );
  }
}


Groups.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.instanceOf(Group).isRequired
  ).isRequired,
  removeGroupFromState: PropTypes.func.isRequired
}

export default connect(["groups"], actions)(Groups);
