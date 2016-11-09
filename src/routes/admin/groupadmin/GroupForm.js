'use strict';

var React = require('react'),
    assign = require("object-assign"),

    GroupAdminStore = require("../groupadmin/GroupAdminStore"),
    UserStore = require("../../AuthContainer/modules/authContainer.js"),

    GroupAdminActions = require("../groupadmin/GroupAdminActions"),

    FormComponents = require("../../../components/utils/FormComponents.react"),
    FormGroup = FormComponents.FormGroup,
    InputGroup = FormComponents.InputGroup,
    InlineCheckbox =  FormComponents.InlineCheckbox,
    CheckboxGroup = FormComponents.CheckboxGroup;

import $ from 'jquery'

export class PanelBody extends React.Component<void, Props, void> {
    constructor () {
        super();
        this.state = {
            name: "ryan",
            displayName: "Ryan",
            type: "default",
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.mode == "update" && newProps.editTarget) {
            this.setState({
                name: newProps.editTarget.name,
                displayName: newProps.editTarget.displayName,
                type: newProps.editTarget.type
            })
        }
        else if (newProps.mode == "create") {
            this.setState(this.getInitialState());
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if ($("#groupType").val() == "default") {
            alert("You must select a group type!");
            $("#groupType").focus();
            return;
        }

        var group = {
            name: $("#groupName").val(),
            displayName: $("#displayName").val(),
            type: $("#groupType").val()
        }
        if (this.props.mode == 'create') {
            GroupAdminActions.createGroup(group);
        }
        else if (this.props.mode == 'update') {
            var data = assign({}, this.props.editTarget, group);
            GroupAdminActions.updateGroup(data);
        }
        this.setState(this.getInitialState());
    }
    handleChange(e) {
        var value = $("#"+e.target.id).val(),
            state = this.state,
            attribute = e.target.name;

        state[attribute] = value;

        this.setState(state);
    }

    render() {
        // var user = UserStore.getSessionUser(),
        //     userType = user.userGroup.type,

        var user = {id:1, userGroup:"admin"},
            userType = "admin",

            groupName = this.state.name,
            displayName = this.state.displayName,
            groupType = this.state.type,

            submitText = this.props.mode === "create" ? "Create Group" : "Update Group",
            groupTypes = [
                { value: "default", display: "group type", style: { display:"none" } },
                { value: "mpo", display: "MPO Group" },
                { value: "state", display: "State Group" },
                { value: "sysAdmin", display: "System Admins" }
            ].filter(function(d) {
                    return d.value != "sysAdmin" || userType == "sysAdmin";
                }),
            groupTypesOptions = groupTypes.map(function(g, i) {
                return <option key={ i } value={ g.value } style={ g.style }>{ g.display }</option>
            });

        return (
            <form onSubmit={ this.handleSubmit }>
                <div className="panel-body">

                    <FormGroup>
                        <InputGroup icon="fa fa-user">
                            <input className="form-control" type="text" name='name'
                                placeholder={ "group name" } value={ groupName }
                                onChange={ this.handleChange } required="required"
                                id="groupName" />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <InputGroup icon="fa fa-sign-in">
                            <input className="form-control" type="text" name='displayName'
                                placeholder={ "display name" } value={ displayName }
                                onChange={ this.handleChange } required="required"
                                id="displayName"/>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <InputGroup icon="fa fa-user">
                            <select className="form-control" name="type"
                                id="groupType" value={ groupType }
                                onChange={ this.handleChange }>
                                { groupTypesOptions }
                            </select>
                        </InputGroup>
                    </FormGroup>

                </div>

                <div className="panel-footer">
                    <input type='submit' className="btn btn-primary btn-block" value={ submitText }/>
                </div>

            </form>
        )
    }
}

function checkGroupPerm(user, group) {
    if (!group) {
        return true;
    }
    if (user.admin && (group.type == "state" || group.type == "sysAdmin")) {
        return true;
    }
    return false;
}

export class PanelHeading extends React.Component<void, Props, void> {

    createMode() {
        this.props.clickHandler("create");
    }
    editMode() {
        this.props.clickHandler("update");
    }
    render() {
        var createButtonClass = this.props.mode === "create" ? "btn btn-success" : "btn btn-danger";

        if (this.props.mode === "update" && this.props.editTarget) {
            var editButtonClass = "btn btn-success";
        }
        else if (this.props.mode === "create" && this.props.editTarget) {
            var editButtonClass = "btn btn-danger";
        }
        else {
            var editButtonClass = "btn";
        }
        var disabled = this.props.editTarget ? "" : "disabled";

        var block = { display: "block", width: "100%" };
        var width50 = { width: "50%", display: "block" }
        return (
            <div className="panel-heading clearfix">
                <div style={block}className="btn-group">
                    <button style={width50}className={ createButtonClass } onClick={ this.createMode }>Create</button>
                    <button style={width50}className={ editButtonClass } disabled={ disabled } onClick={ this.editMode }>Update</button>
                </div>
            </div>
        )
    }
}

export class GroupForm extends React.Component<void, Props, void> {
    constructor () {
        super();
        this.state = { mode: "create" };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.editTarget && this.state.mode == "create") {
            this.setState({ mode: "update" })
        }
    }

    handleClick(mode) {
        if (mode != this.state.mode) {
            this.setState({ mode: mode });
        }
    }

    render() {
        var target = this.state.mode === "update" ? this.props.editTarget : null;

        return (
            <div className="panel panel-primary">

                <PanelHeading mode={ this.state.mode } editTarget={ this.props.editTarget }
                    clickHandler={ this.handleClick }/>

                <PanelBody mode={ this.state.mode } editTarget={ target }
                    groups={ this.props.groups }/>

            </div>
        )
    }
}

export default GroupForm
