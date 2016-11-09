'use strict'

var React = require("react");

exports.InputGroup = React.createClass({
    render: function() {
        var width = { width: "100% "};
        return (
            <div className="input-group" style={ width }>
                { this.props.icon ?
                    <span className="input-group-addon">
                        <i className={ this.props.icon }/>
                    </span>
                : null }
                { this.props.children }
            </div>
        )
    }
})

exports.CheckboxGroup = React.createClass({
    render: function() {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
})
exports.InlineCheckbox = React.createClass({
    render: function() {
        return (
            <div className="checkbox">
                <label>
                    { this.props.children }
                    { this.props.label }
                </label>
            </div>
        )
    }
})

exports.FormGroup = React.createClass({
    render: function() {
        var formGroup = (
            <div className="form-group" style={ this.props.style }>
                { this.props.label ?
                    <label className="control-label">{ this.props.label }</label>
                    : null }
                { this.props.children }
            </div>
        );
        return this.props.horizontal ?
            <div className="form-horizontal">
                { formGroup }
            </div>
            : formGroup;
    }
})
