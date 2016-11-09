import React from "react"
import GroupTable from "../groupadmin/GroupTable"
import GroupForm from "../groupadmin/GroupForm"
import GroupAdminStore from "../groupadmin/GroupAdminStore"
import GroupAdminActions from "../groupadmin/GroupAdminActions"

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
        return (
            <div title="Group Admin">
                <div className="col-lg-10">
                    <GroupTable groups={ this.state.groups }/>
                </div>
                <div className="col-lg-2">
                    <GroupForm groups={ this.state.groups }
                        editTarget={ this.state.editTarget } />
                </div>
            </div>
        )
    }
}

export default GroupAdmin