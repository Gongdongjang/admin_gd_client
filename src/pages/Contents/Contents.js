import React from "react";
import {Route, Routes} from "react-router-dom";
import "../../CSS/Content.css";
import ContentsList from "./ContentsList";
import ContentsDetail from "./ContentsDetail";
import ContentsWrite from "./ContentsWrite";

function Contents() {
    return [
            <Routes>
                <Route path='/' element={<ContentsList />}/>
                <Route path='/:content_id' element={<ContentsDetail />}/>
                <Route path='/write' element={<ContentsWrite />}/>
                <Route path='/update/:content_id' element={<ContentsWrite />}/>
            </Routes>
        ]
}

export default Contents;
