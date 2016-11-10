import React from 'react'
import SysAdminActions from '../sysadmin/SysAdminActions'
import SysAdminStore from "../sysadmin/SysAdminStore"

module.exports = React.createClass({

    getInitialState: function() {
        return { messages: [] };
    },

    componentDidMount: function() {
        SysAdminStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        SysAdminStore.removeChangeListener(this.onChange);
    },

    onChange: function() {
        this.setState({ messages: SysAdminStore.getMessages() });
    },

    getRequest: function() {
        var textBox = document.getElementById("request"),
            requestText = textBox.value.replace(/\s/g, "");

        try {
            return JSON.parse(requestText);
        }
        catch (e) {
            return null;
        }
    },

    updateRoutes: function() {
        var request = this.getRequest();
        SysAdminActions.updateRoutes(request);
    },
    patchRoutes: function() {
        SysAdminActions.patchRoutes(request);
    },
    createAutoRoutes: function() {
        var request = this.getRequest();
        if (!request) {
            return alert("You need an owner and a 5 digit state/county fips!!!");
        }
        else if (!request.owner) {
            return alert("You need an owner!!!");
        }
        else if (!request.fips) {
            return alert("You need a 5 digit state/county fips!!!");
        }
console.log("<SysAdmin.createAutoRoutes>",request);
        SysAdminActions.createAutoRoutes(request);
    },

    render: function() {
        var messages = this.state.messages.map(function(d, i) {
                return <div key={ i }>{ d }</div>
            });
        messages.unshift('{"owner":"OWNER","fips":FIPS}')
        return (
            <div title="System Admin">
                <div className="col-lg-2">
                    <div className="card">
                        <div className="card-header primary-color white-text">
                            System Admin Functions     
                        </div>
                        <div className="card-block">
                            <div className="btn-group-vertical" style={{width: "100%"}}>
                                <button className="btn btn-danger btn-block" onClick={ this.updateRoutes }>
                                    Update Routes
                                </button>
                                <button className="btn btn-danger btn-block" onClick={ this.patchRoutes }>
                                    Patch Routes
                                </button>
                                <button className="btn btn-danger btn-block" onClick={ this.createAutoRoutes }>
                                    Create Auto Routes
                                </button>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" id="request"
                                    placeholder="Enter valid JSON..."/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    { messages.length ?
                        <div className="card">
                            <div className="card-header card-info white-text">
                                Messages
                            </div>
                            <div className="card-block">
                                <div className="card-text">
                                    { messages }
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-danger" onClick={ SysAdminActions.dismissMessages }>
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    : null }
                </div>
            </div>
        );
    }
});
