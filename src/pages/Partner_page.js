import React from "react";
import { Route, Routes } from 'react-router-dom';

import Farm_read from './Farm_read';
import Store_read from './Store_read';
import Partner_post from "./PartnerPost";
import Farm_page from "./Farm_page";
import Store_page from "./Store_page";


class Partner_page extends React.Component{
    render(){
        return (
            <div className="partnerSection">
                <Routes>
                    <Route path="/" element={<Farm_read />}/>
                    {/*farm 리스트*/}
                    <Route path="/farmRead/*" element={<Farm_read />} />
                    {/*store 리스트*/}
                    <Route path="/storeRead/*" element={<Store_read />}/>
                    {/*등록 */}
                    <Route path="/partner_post/*"  element={<Partner_post />} />
                    {/*list */}
                    <Route path="/farmRead/farmPage/:farm_id"  element={<Farm_page/>} />
                    <Route path="/storeRead/storePage/:store_id"  element={<Store_page/>} />
                    
                </Routes>
            </div>
            
  );
    }
}

export default Partner_page;