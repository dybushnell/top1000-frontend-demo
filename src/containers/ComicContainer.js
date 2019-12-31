import React from "react";
import ComicComponent from "../components/ComicComponent";

class ComicContainer extends React.Component {
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

  //sorts comics into activeComics, alternateComics, and cancelledComics
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
    target[0].cancelled = true;
    let cancelledComicId = target[0].id;

    this.setState({
      activeComics: this.state.activeComics.filter(
        comic => comic.id !== cancelledComicId
      )
    });
    this.updateDBWithCancelledComic(cancelledComicId);
    // debugger;
    alert(
      `THANK YOU FOR CANCELLING ${target[0].name}\n\nThis year’s Top 1000 Comedians list only has room for the ABSOLUTE BEST one thousand comedians. Thank you for cancelling one of them. Now, because of your bravery, a comedian who was juuuust not good enough to make a one thousand person list will make the cut.`
    );
  };

  //updates database so that removed comic is cancelled:true
  updateDBWithCancelledComic = cancelledComicId => {
    fetch(
      `https://top1000-backend-postgres-demo.herokuapp.com/api/v1/comics/${cancelledComicId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          cancelled: true
        })
      }
    )
      .then(resp => resp.json())
      .then(this.getComics);
  };

  render = () => {
    let counter = 0;
    let comicComponents = this.state.activeComics.map(comic => (
      <ComicComponent
        key={counter}
        name={comic.name}
        counter={(counter += 1)}
        show={comic.show}
        clickHandler={this.clickHandler}
        idd={comic.id}
        buttonText="CANCEL"
      />
    ));
    return (
      <div>
        <div className="comic-container">{comicComponents}</div>
      </div>
    );
  };
}

export default ComicContainer;
