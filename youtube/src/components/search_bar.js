import React, {Component} from 'react';

class SearchBar extends Component {
	constructor(props){
		super(props);	//calling the parent method
		this.state = {term:''};	//term as search_term initilize
	}
	render(){
		// return <input onChange={e => console.log(e.target.value)} />;
		return (
			// looks 2-way data binding but it is not,
			// onchange method gets call everytime the value change
			// then it will updata the DOM.
			//put this after the input ==> "Value of the input: {this.state.term}"
			<div className="search-bar">
				<input
					value = {this.state.term}
					onChange={event => this.onInputChange(event.target.value)}
				/>
				
			</div>
			);
	}

	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChange(term);
	}

}

export default SearchBar;