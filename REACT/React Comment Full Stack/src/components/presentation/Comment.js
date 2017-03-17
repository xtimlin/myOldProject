import React, {Component} from 'react';
import styles from './styles';


class Comment extends Component {
	
	render(){
		const style = styles.comment;

		return (
			<div style={style.commentListitem}>
				
				<p style={style.commentBody}>{this.props.currentComment.body}</p>
				<span style={style.commentUser}>{this.props.currentComment.username}</span>
				<span style = {style.commentPie}>|</span>
				<span style={style.commentUser}>{this.props.currentComment.timestamp}</span>
				<hr/>
			</div>
		)
	}
}

export default Comment;