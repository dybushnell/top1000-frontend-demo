import React from "react";
import { Link } from "react-router-dom";


const Footer = props => {
  return (
    <div className="footer" >
      <Link className="link" to={props.link}> {props.linkText}</Link>
      <br /><br />
      <div className="credits">
        Concept by Zach Broussard<br />
        Implemented by <a href="http://www.dybushnell.com">Dave Bushnell</a></div>
    </div >
  );
}

export default Footer;
