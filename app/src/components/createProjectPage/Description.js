import React, {Component} from 'react'

const CreateDescription = props => { 
	const styles = {
		inputField: {
			width: "472px",
			height: "187px",
			padding: "10px",
			color: "red", // Change this color to white
			fontStyle: "italic",
			backgroundColor: "rgba(0, 0, 0, 0)"

	}
}
		return(
			<div>
				<textarea
		          type="text"
		          name="description"
		          color="white"
		          placeholder="Add descriptive text for your project. Max 200 characters."
		          style={styles.inputField}
		          value={props.description}
		          onChange={e => props.handleInputChange(e)}
	        	/>
        	</div>
        )
}

export default CreateDescription;