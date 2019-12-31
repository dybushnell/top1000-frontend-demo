import React from "react";

const Header = props => {

  return (
    <div className="header">
      <h2>{props.bigText}</h2>
      <div>Please help <a href="https://twitter.com/ZachBroussard">Zach Broussard</a> create the perfect list of the top 1000 comedians of 2019 by un-cancelling comedians below.</div>
    </div>
  );
}

export default Header;
