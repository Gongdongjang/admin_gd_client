import React, { useState, useEffect }  from 'react';

import Header from './Header';
import Routers from './Routers';
import Cookies from "universal-cookie";

function Main() {
    const cookies = new Cookies();

    useEffect(() => {
        // 미로그인 시 튕기게 설정
        if (cookies.get('access_token') === undefined) {
            alert('로그인 후 사용해주세요.');
            document.location.replace('/login');
        }
    }, [])

  return (
    <div>
      <Header />
      <Routers/>
    </div>
  );
}

export default Main;
