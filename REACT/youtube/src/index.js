import _ from 'lodash';
//inject react as dependence for my app, user to create and manage the compoments(controller)
import React, {Component} from 'react';
//react-dom is used to interact with the actual DOM(directive)
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'; //youtube API
import SearchBar from './components/Search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = "AIzaSyAr0tLGWeQmZp4d63xbchVkBHBS8pCIM38";

//create a new component. this component should produce html code
//jsx is a subset of javascript allow us to write what looks like javascript
//webpack and babbel is going to transpiring the code before it gets in the browser
class App extends Component{
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch("react + angulat = speed");
	}

	videoSearch(term){
		YTSearch({key : API_KEY, term : term}, (videos)=>{
			// this.setState({videos : videos});
			this.setState({
				videos : videos,
				selectedVideo:videos[0]
			});
		});
	}

	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

		return (
				<div>
					<SearchBar onSearchTermChange={videoSearch} />
					<VideoDetail video={this.state.selectedVideo} />
					<VideoList
						onVideoSelect={selectedVideo => this.setState({selectedVideo})}
						videos={this.state.videos}
					/>
				</div>
			);
		}
};

//this component will generated HTML and put it on the page (back to DOM)
//this is tell react where to insert this div the view
ReactDOM.render(<App />, document.querySelector('.container'));