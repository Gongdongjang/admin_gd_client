import Nav from './Nav';
import React from "react";
class Contents extends React.Component{
    render(){
  return (
    <div  className="section">
      <Nav />
      <div>
      <h1>컨텐츠</h1>
      <p>컨텐츠 페이지입니다.</p>
      </div>
    </div>
  );
};
}
export default Contents;
