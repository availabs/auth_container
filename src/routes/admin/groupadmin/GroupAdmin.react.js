import React from "react"
import GroupTable from "../groupadmin/GroupTable"
import GroupForm from "../groupadmin/GroupForm"
import GroupAdminStore from "../groupadmin/GroupAdminStore"
import GroupAdminActions from "../groupadmin/GroupAdminActions"
import AuthContainer from '../../AuthContainer/components/AuthContainer'

function getState() {
    return {
        groups: GroupAdminStore.getAllGroups(),
        editTarget: GroupAdminStore.getEditTarget()
    }
}

class GroupAdmin extends React.Component<void, Props, void> {
    constructor () {
        super();
        this.state = getState();
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        GroupAdminStore.addChangeListener(this.onChange);

        if (!GroupAdminStore.getAllGroups().length) {
            GroupAdminActions.getAllGroups();
        }
    }

    componentWillUnmount() {
        GroupAdminStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState(getState());
    }

    render() {
        console.log(GroupAdminStore.getAllGroups())
        return (
            <AuthContainer redirect="/groupadmin">
                <div title="Group Admin">
                    <div className="col-lg-10">
                        <GroupTable groups={ this.state.groups }/>
                    </div>
                    <div className="col-lg-2">
                        <GroupForm groups={ this.state.groups }
                            editTarget={ this.state.editTarget } />
                    </div>
                </div>
            </AuthContainer>
        )
    }
}

export default GroupAdmin