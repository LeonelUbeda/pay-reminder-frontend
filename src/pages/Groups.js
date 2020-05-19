import React from 'react'
import CreateGroup from '../components/groups/CreateGroup'
import { connect } from 'unistore/react'
import { actions } from '../store'
import GroupItem from '../components/groups/CroupItem'
class Groups extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            groups: []
        }
    }

    componentDidMount(){
        this.setState({
            ...this.state,

        })
    }

    render(){
        return (
            <div className="mt-20 px-4">
                {this.props.groups.map(group => <GroupItem group={group} key={group.id}/>)}
                <CreateGroup />
            </div>
        )
    }
}
export default connect(['groups'], actions)(Groups)