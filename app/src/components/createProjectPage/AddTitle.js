import React, {Component} from 'react'
import "./Input.css"

const Title = props => { 
		return(
			<div>
				<input
		          type="text"
		          name="projectName"
		          placeholder="Add Project Title"
		          className="Title"
		          value={props.description}
		          onChange={e => props.handleInputChange(e)}
	        	/>
        	</div>
        )
}

export default CreateTitle;


