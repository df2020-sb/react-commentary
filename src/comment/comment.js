import React from "react";
import './comment.css'

const Comment = (props) => {
  return (
    <li >
      <div className='header'>
        <div className='header-left'>
          <span className='name'>{props.name}</span>
          <span className='dateTime'>{props.dateTime}</span>
        </div>
        <button className='delete-btn' onClick={props.onButtonClick}>Удалить</button>
      </div>
      <p className='text'>{props.text}</p>
    </li >
  );
};

export default Comment;
