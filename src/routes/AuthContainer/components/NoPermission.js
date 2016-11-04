import React from 'react'

export class NoPermission extends React.Component<void, Props, void> {

	render(){
		return (
				<div className="card-block">
          <h3>You do not have permission to view this content</h3>
        </div>
			)
	}


}

export default (NoPermission)