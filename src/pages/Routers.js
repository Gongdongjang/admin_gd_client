import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import MD from './MD';
import Partner from './Partner';
import Contents from './Contents';
import Login from './Login';
import MD1 from './MD1';
import MD2 from './MD2';
import Notice from "./Notice";
class Routers extends React.Component{
    render(){
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/home"  element={<Home />} />
                    <Route path="/partner" element={<Partner />} />
                    <Route path="/md" element={<MD />} />
                    <Route path="/contents" element={<Contents />} />
                    <Route path={'/notice'} element={<Notice />} />
                    <Route path="/login" element={<Login />} />
                    {/*MD */}
                    <Route path="/md1" element={<MD1 />}/>
                    <Route path="/md2"  element={<MD2 />} />
                </Routes>
            </div>
            
  );
    }
}

export default Routers;
