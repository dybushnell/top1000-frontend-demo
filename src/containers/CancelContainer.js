import React from "react";
import ComicComponent from "../components/ComicComponent";

class CancelContainer extends React.Component {
  state = {
    allComics: [],
    activeComics: [],
    alternateComics: [],
    cancelledComics: []
  };

  componentDidMount = () => {
    this.getComics();

    this.interval = setInterval(() => this.getComics(), 10000);
  };

  getComics = () => {
    fetch("https://top1000-backend-postgres-demo.herokuapp.com/api/v1/comics")
      .then(resp => resp.json())
      .then(data => this.setState({ allComics: data }))
      .then(this.sortAllComics);
  };

  //sorts comics into activeComics and alternateComics; works
  sortAllComics = () => {
    this.setState({
      activeComics: this.state.allComics
        .filter(comic => comic.cancelled === false)
        .slice(0, 1000)
    });
    this.setState({
      alternateComics: this.state.allComics
        .filter(comic => comic.cancelled === false)
        .slice(1001)
    });
    this.setState({
      cancelledComics: this.state.allComics.filter(
        comic => comic.cancelled === true
      )
    });
  };

  clickHandler = e => {
    let target = this.state.allComics.filter(
      comic => comic.name === e.target.id
    );
    target[0].cancelled = false;
    let uncancelledComicId = target[0].id;
    this.setState({
      cancelledComics: this.state.cancelledComics.filter(
        comic => comic.id !== uncancelledComicId
      )
    });
    this.updateDBWithUncancelledComic(uncancelledComicId);
    alert(`THANK YOU FOR UNCANCELLING ${target[0].name}.`);
  };

  //updates database so that removed comic is cancelled:true
  updateDBWithUncancelledComic = uncancelledComicId => {
    fetch(
      `https://top1000-backend-postgres-demo.herokuapp.com/api/v1/comics/${uncancelledComicId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          cancelled: false
        })
      }
    )
      .then(resp => resp.json())
      .then(this.getComics);
  };

  render = () => {
    let counter = 0;
    let cancelComponents = this.state.cancelledComics.map(comic => (
      <ComicComponent
        key={counter}
        name={comic.name}
        counter={(counter += 1)}
        show={comic.show}
        clickHandler={this.clickHandler}
        idd={comic.id}
        buttonText="UNCANCEL"
      />
    ));

    return (
      <div>
        <div className="comic-container">
          {" "}
          {cancelComponents}
        </div>
      </div>
    );
  }
};


export default CancelContainer;
