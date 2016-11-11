import React from 'react'
import UserTable from "../useradmin/UserTable"
import UserForm from "../useradmin/UserForm"
import UserStore from '../../AuthContainer/modules/UserStore'
import UserActions from '../../AuthContainer/modules/UserActions'
import GroupAdminStore from "../groupadmin/GroupAdminStore"
import GroupAdminActions from "../groupadmin/GroupAdminActions"
import AuthContainer from '../../AuthContainer/components/AuthContainer'

function getState() {
    var groups = [{ value: "default", display: "user group", style: { display: "none"} }];
    return {
        user: UserStore.getSessionUser(),
        users: UserStore.getAllUsers(),
        editTarget: UserStore.getEditTarget(),
        groups: groups.concat(GroupAdminStore.getAllGroups().map(function(d) {
                return { value: d.name, display: d.name };
            }))
    }
}

class UserAdmin extends React.Component<void, Props, void> {
    constructor () {
        super();
        this.state = getState();
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        GroupAdminStore.addChangeListener(this.onChange);
        UserStore.addChangeListener(this.onChange);

        if (!GroupAdminStore.getAllGroups().length) {
            GroupAdminActions.getAllGroups();
        }
        if (!UserStore.getAllUsers().length) {
            UserActions.getAllUsers();
        }

    }
    componentWillUnmount() {
        GroupAdminStore.removeChangeListener(this.onChange);
        UserStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState(getState());
    }

    render() {
        return (
            <AuthContainer redirect="/useradmin">
                <div className="col-lg-10">
                    <UserTable users={ this.state.users }/>
                </div>
                <div className="col-lg-2">
                    <UserForm users={ this.state.users } user={ this.state.user }
                        editTarget={ this.state.editTarget } groups={ this.state.groups }/>
                </div>
            </AuthContainer>
        );
    }
}

export default UserAdmin