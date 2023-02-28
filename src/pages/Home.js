import React from "react";
import { Link } from "react-router-dom";

import '../CSS/Home.css';
class Home extends React.Component{
    render(){
  return (
    
    <div>
    <div id="mainLogo" ></div>
    <Link to="/login" ><button id="mainLogin">로그인하기</button></Link>
    </div>
  );
};
}
export default Home;