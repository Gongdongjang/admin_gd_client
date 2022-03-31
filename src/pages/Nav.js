import React from 'react';
import '../CSS/Nav.css';
class Nav extends React.Component{
    
      render(){
          return(
            <div className='side'>
                <ul>
                  <li><a href="#intro">Intro</a></li>
    <li>
      <a href="#dev">Developer Mode</a>
      <ul>
        <li><a href="#dev-edit-html">Edit HTML</a></li>
        <li><a href="#dev-element-classes">Element Classes</a></li>
        <li><a href="#dev-slide-classes">Slide Classes</a></li>
        <li><a href="#dev-export-html">Export HTML</a></li>
      </ul>
    </li>
    <li>
      <a href="#css">CSS Editor</a>
      <ul>
        <li><a href="#css-fonts">Custom Fonts</a></li>
        <li><a href="#css-developer-mode">Developer Mode</a></li>
        <li><a href="#css-examples">Examples</a></li>
      </ul>
    </li>
  </ul>
            </div>
          );
      }
}
export default Nav;