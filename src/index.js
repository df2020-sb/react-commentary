import React, { Component } from "react";
import ReactDOM from "react-dom";
import Comment from "./comment/comment";
import './style.css'

class CommentApp extends Component {
  constructor() {
    super();
    this.state = {
      comments: JSON.parse(localStorage.getItem('state')) || [],
      newCommentName: "",
      newCommentText: "",
    };
  }

  getDateTime() {
    let d = new Date();
    return `${("0" + d.getDate()).slice(-2)}.${("0" + (d.getMonth() + 1)).slice(-2)}.${d.getFullYear()} в ${(
      "0" + d.getHours()
    ).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;
  }

  removeComment(key) {
    const comments = this.state.comments;
    comments.splice(key, 1);
    this.setState({ comments });
    localStorage.setItem('state', JSON.stringify(comments));
  }

  addComment() {
    const comments = this.state.comments;
    if (this.state.newCommentName !== '' && this.state.newCommentText !== '') {
      comments.push({
        name: this.state.newCommentName,
        text: this.state.newCommentText,
        dateTime: this.getDateTime(),
      });
      this.setState({ comments, newCommentText: "", newCommentName: "" });
      localStorage.setItem('state', JSON.stringify(comments));
    }
  }


  render() {
    return (
      <div className='container'>
        <form >
          <input
            className='input'
            required
            type="text"
            placeholder="Ваше имя"
            value={this.state.newCommentName}
            onChange={(ev) => {
              this.setState({ newCommentName: ev.target.value });
            }}
          />

          <textarea
            className='textarea'
            required
            placeholder="Текст комментария"
            value={this.state.newCommentText}
            onChange={(ev) => {
              this.setState({ newCommentText: ev.target.value });
            }}
          />
          <button type='button' className='button' onClick={this.addComment.bind(this)
          }>Добавить</button>
        </form>

        <ul className='list'>
          {this.state.comments.map((comment, i) => {
            return <Comment
              key={i}
              name={comment.name}
              dateTime={comment.dateTime}
              text={comment.text}
              onButtonClick={this.removeComment.bind(this, i)} />;
          })}
        </ul>
      </div>
    );
  }
}
ReactDOM.render(<CommentApp />, document.querySelector("#app"));
