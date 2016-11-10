import React from 'react'
import GroupAdminActions from '../groupadmin/GroupAdminActions'
import { Modal } from 'react-bootstrap'

var GroupRow = React.createClass({

    handleDeleteClick: function() {
        this.props.openDelete(this.props.group)
    },

    handleEditClick: function() {
        GroupAdminActions.setEditTarget(this.props.group);
    },

    render: function() {
        return (
            <tr onClick={ this.handleClick } className={ this.props.classString } >
                <td>{ this.props.group.name }</td>
                <td>{ this.props.group.displayName }</td>
                <td>{ this.props.group.type }</td>
                <td>
                    <button onClick={ this.handleEditClick } data-group={ this.props.group } className="btn btn-xs btn-primary">
                        Update
                    </button>
                </td>
                <td>
                    <button onClick={ this.handleDeleteClick } data-group={ this.props.group } className="btn btn-xs btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
})

class GroupTable extends React.Component<void, Props, void> {
    constructor () {
        super();
        this.state = { 
            showModal: false,
            deleteGroup:null
         };
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
    }

    deleteGroup() {
        console.log("log before delete GROUP table", this.state.deleteGroup)
        GroupAdminActions.deleteGroup(this.state.deleteGroup);
        this.close()
    }

    close() {
        this.setState({ showModal: false, deleteGroup:null });
    }

    open(deleteGroup) {
        this.setState({ showModal: true, deleteGroup: deleteGroup });
    }

    render() {
        var scope = this;
        var rows = this.props.groups.map(function(group, i) {
            return (
                <GroupRow openDelete={scope.open} key={ i } group={ group } />
            )
        }, this);
        
        return (
            <div className="panel panel-default">
                <table className="table table-striped table-hover">

                    <thead>
                        <tr>
                            <th>Group Name</th>
                            <th>Display Name</th>
                            <th>Group Type</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        { rows }
                    </tbody>
                </table>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <h4 className="modal-title" id="myModalLabel2">Delete User</h4>
                    </Modal.Header>

                     <Modal.Body>
                        <h4>Are you sure you want to delete?</h4>
                    </Modal.Body>

                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={ this.close }>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={ this.deleteGroup } data-dismiss="modal">Delete</button>
                    </Modal.Footer>
                </Modal> 
            </div>
        )
    }
}

export default GroupTable
