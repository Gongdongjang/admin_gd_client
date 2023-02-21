import React from "react";
import { Route, Routes } from 'react-router-dom';
import MD_post from './MD_post';
import MD_End from './MDEnd';
import MD_read from './MD_read';
import ItemPage from './ItemPage';
import '../CSS/PartnerPost.css';
class MDPost_page extends React.Component{
    render(){
        return (
            <div className="partnerSection">
                <Routes>
                    <Route path="/" element={<MD_read />}/>
                    
                    <Route path="/MDRead/*" element={<MD_read/>}/>
                    <Route path="/MDEnd/*" element={<MD_End/>}/>
                    <Route path="/MDPost/*"  element={<MD_post />}exact  />
                    <Route path="/MDRead/ItemPage/:md_id"  element={<ItemPage />} />

                    <Route path="/mdPost/update/:md_id" element={<MD_post />}/>
                </Routes>
            </div>
            
  );
    }
}

export default MDPost_page;