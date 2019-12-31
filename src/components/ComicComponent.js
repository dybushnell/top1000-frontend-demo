import React from "react";

const ComicComponent = props => {
  return (
    <div className="comic-component">
      <br />
      {props.counter} - {props.name}
      <span> </span>
      <button className="button" id={props.name} onClick={props.clickHandler}>
        {" "}
        {props.buttonText}{" "}
      </button>
      <br />
    </div>
  );
};

export default ComicComponent;
