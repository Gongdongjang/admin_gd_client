import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import MDPost from './MDPost';
import Partner from './Partner';
import Contents from './Contents/Contents';
import Review from './Review';
import ReviewPage from './ReviewPage';
import Login from './Login';
import Notice from "./Notice";
import MD_post from './MD_post';
import MD_read from './MD_read';
import MDList from './MDList';
import OrderList from './OrderList';

import MdPostOk from './MdPostOk';
import MdEditOk from './MdEditOk';
import Notification from './Notification/Notification';

class Routers extends React.Component{
    render(){
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/home"  element={<Home />} />
                    <Route path={'/notice/*'} element={<Notice />} />
                    <Route path="/contents/*" element={<Contents />} />
                    <Route path="/partner/*" element={<Partner />} />
                    <Route path="/mdPost/*" element={<MDPost />} exact/>
                    <Route path="/review/*" element={<Review />}/>
                    <Route path="/login" element={<Login />} />
                    
                   
                    {/*list */}
                    <Route path={"/notification/*"} element={<Notification />} />
                    <Route path="/orderList/:md_id"  element={<OrderList />} />
                </Routes>
            </div>
            
  );
    }
}

export default Routers;
