import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import MD_post from './MD_post';
import Partner from './Partner';
import Contents from './Contents';
import Login from './Login';
import MD_read from './MD_read';
import MDList from './MDList';
import ItemPage from './ItemPage';
import MdPostOk from './MdPostOk';
import MdEditOk from './MdEditOk';
class Routers extends React.Component{
    render(){
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/home"  element={<Home />} />
                    <Route path="/partner" element={<Partner />} />
                    <Route path="/mdPost" element={<MD_post />} exact/>
                    <Route path="/contents" element={<Contents />} />
                    <Route path="/login" element={<Login />} />
                    {/*MD */}
                    <Route path="/mdRead" element={<MD_read />}/>
                    <Route path="/mdList"  element={<MDList />} />
                    <Route path="/mdPost/ok" element={<MdPostOk />} />
                    <Route path="/mdEdit/ok" element={<MdEditOk />} />
                    <Route path="/mdPost/update/:md_id" element={<MD_post />}/>
                    {/*list */}
                    <Route path="/ItemPage/:md_id"  element={<ItemPage />} />
                </Routes>
            </div>
            
  );
    }
}

export default Routers;