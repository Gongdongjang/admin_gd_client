import React from "react";
import { Route, Routes } from 'react-router-dom';
import Farm_post from './Farm_post';
import Store_post from './Store_post';
import Farm_page from "./Farm_page";

class PartnerPost_page extends React.Component{
    render(){
        return (
            <div className="partnerPostSection">
                <Routes>
                    <Route path="/" element={<Farm_post />}/>
                    
                    <Route path="/storePost/*"  element={<Store_post />}exact />
                    <Route path="/farmPost/*" element={<Farm_post />}exact />

                    <Route path="/farmPost/update/:farm_id" element={<Farm_post />}/>
                    <Route path="/storePost/update/:store_id" element={<Store_post />}/>
                </Routes>
            </div>
            
  );
    }
}

export default PartnerPost_page;