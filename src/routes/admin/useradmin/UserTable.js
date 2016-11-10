import React from 'react'
import UserActions from '../../AuthContainer/modules/UserActions'
import $ from 'jquery'
import { Modal } from 'react-bootstrap'

var UserRow = React.createClass({

    handleDeleteClick: function() {
        this.props.openDelete(this.props.user)
    },

    handleEditClick: function() {
        UserActions.setEditTarget(this.props.user);
    },

    render: function() {
        return (
            <tr onClick={ this.handleClick } className={ this.props.classString } >
                <td>{ this.props.user.userName }</td>
                <td>{ this.props.user.loginName }</td>
                <td>{ this.props.user.email }</td>
                <td>{ this.props.user.group }</td>
                <td>{ this.props.user.admin.toString() }</td>
                <td>
                    <button onClick={ this.handleEditClick } data-user={ this.props.user } className="btn btn-xs btn-primary">
                        Update
                    </button>
                </td>
                <td>
                    <button onClick={ this.handleDeleteClick } data-user={ this.props.user } className="btn btn-xs btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
})

class UserTable extends React.Component<void, Props, void> {
    constructor () {
        super();

        this.state = { 
            showModal: false,
            deleteUser:null
         };
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    deleteUser(d) {
        console.log("log before delete user table", this.state.deleteUser)
        UserActions.deleteUser(this.state.deleteUser);
        this.close()
    }

    close() {
        this.setState({ showModal: false, deleteUser:null });
    }

    open(deleteUser) {
        this.setState({ showModal: true, deleteUser: deleteUser });
    }
    render() {
        var scope = this;
        var rows = this.props.users.map(function(user) {
            return (
                <UserRow openDelete={scope.open} key={ user.id } user={ user } />
            )
        }, this);

        return (
            <div className="panel panel-default">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Login Name</th>
                            <th>Email</th>
                            <th>Group</th>
                            <th>Administrator</th>
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
                        <button type="button" className="btn btn-danger" onClick={ this.deleteUser } data-dismiss="modal">Delete</button>
                    </Modal.Footer>
                </Modal> 
            </div>
        )
    }
};

export default UserTable