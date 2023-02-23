import React from "react";
import { Route, Routes } from 'react-router-dom';
import Review_delected from './Review_delected';
import Review_read from './Review_read';
import ReviewPage from './ReviewPage';
import '../CSS/PartnerPost.css';
class Review_page extends React.Component{
    render(){
        return (
            <div className="partnerSection">
                <Routes>
                    <Route path="/" element={<Review_read />}/>
                    
                    <Route path="/reviewRead/*" element={<Review_read/>}/>
                    <Route path="/delectedList/*"  element={<Review_delected />} />
                    {/*list */}
                    <Route path="/reviewRead/reviewPage/:rvw_id"  element={<ReviewPage/>} />
                </Routes>
            </div>
            
  );
    }
}

export default Review_page;