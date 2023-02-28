import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import searchImg from "../../imgs/gdg_admin_ic/ic_search.png";

import axios from "axios";

function ContentsList() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [search_word, setSearchWord] = useState('');
    const [delete_list, setDeleteList] = useState([]);
    const [category, setCategory] = useState('등록순');
    const [isTmp, setIsTmp] = useState(0);
    const [bannerList, setBannerList] = useState([]);
    let[menu,setMenu] = useState(0);

    const handleClickCheckbox = async (event, delete_list) => {
        const deleteIndex = event.target.value;

        if (delete_list.includes(deleteIndex)) {
            setDeleteList(delete_list.filter((index) => deleteIndex !== index));
        } else {
            setDeleteList([...delete_list, deleteIndex]);
        }

        console.log(delete_list);
    }

    const fetchContentList = async (category, isTmp) => {
        let url = `/api/content?aspect=admin&is_tmp=${isTmp}`;
        if (category !== '등록순') url += `&category=${category}`;

        const res = await axios.get(url);
        setCount(res.data.length);
        setList(res.data);

        const bannerRes = await axios.get('/api/content/banner');
        const bannerData = bannerRes.data.data;
        setBannerList([bannerData[0].content_id, bannerData[1].content_id, bannerData[2].content_id])
    }

    const renderContentList = (list) => {
        return list.map((content) => {
            return [
                <div className="item_card">
                    
                    <NavLink to={'/main/contents/' + content.content_id}>
                        <table>
                            <tbody>
                            <tr>
                            <th><input type={"checkbox"} value={content.content_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/></th>
                            <th style={{width:'250px'}}>{content.content_id}</th>
                            <th style={{width:'450px'}}>{content.content_title}</th>
                            <th style={{width:'350px'}}>{content.content_category}</th>
                            <th style={{width:'550px'}}>{content.content_date}</th>
                            <th style={{width:'550px'}}>{content.upload_date}</th>
                            </tr>
                            </tbody>
                        </table>
                        
                    </NavLink>
                </div>
            ]
        })
    }

    const renderTmpList = (list) => {
        return list.map((content) => {
            return [
                <div className="item_card">
                    
                    <NavLink    to={'/main/contents/update/' + content.content_id}>
                       <table>
                        <tbody>
                            <tr>
                            <th style={{width:'20px'}}><input type={"checkbox"} value={content.content_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/></th>
                            <th style={{width:'250px'}}>{content.content_id}</th>
                            <th style={{width:'450px'}}>{content.content_title}</th>
                            <th style={{width:'350px'}}>{content.content_category}</th>
                            <th style={{width:'550px'}}>{content.content_date}</th>
                            <th style={{width:'550px'}}>{content.upload_date}</th>
                            </tr>
                        </tbody>
                       </table>
                        
                    </NavLink>
                </div>
            ]
        })
    }

    useEffect(() => {
        fetchContentList(category, isTmp)
    }, [category, isTmp])

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value);
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        const res = await axios.get(`/api/content/search?search=${search_word}`);
        setList(res.data);
    }

    const handleDeleteClick = async (event, list, delete_list) => {
        event.preventDefault();

        let body = []
        delete_list.forEach(id => {
            body.push({
                id: id
            })
        })

        if (window.confirm('정말 삭제하시겠습니까?')) {
            const res = await axios.post('/api/content/delete', {
                content_ids: body
            });
            alert(res.data.content_id + '를 삭제했습니다.');
            window.location.reload();
        } else {
            alert('삭제를 취소했습니다.');
        }
    }

    const handleChange = async (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'category') setCategory(value);
    }

    const handleBannerChange = async (event, bannerList) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case 'banner1': setBannerList([value, bannerList[1], bannerList[2]]); break;
            case 'banner2': setBannerList([bannerList[0], value, bannerList[2]]); break;
            case 'banner3': setBannerList([bannerList[0], bannerList[1], value]); break;
        }
    }

    const handleBannerSubmit = async (event) => {
        event.preventDefault();

        let body = [];
        for (let banner of bannerList) {
            body.push({
                id: banner,
                order: bannerList.indexOf(banner) + 1
            })
        }

        const res = await axios.post('/api/content/banner', body);
        if (res.status === 200) alert('홍보용 배너 컨텐츠가 성공적으로 변경됐습니다.');
        else alert('서버에 오류가 발생했습니다. 개발팀에게 문의 주세요.');
    }

    return (
        <div>
            <ul className="tab">
                <li className={`${isTmp === 0? 'tabBtnActive': 'tabBtn'}`}  onClick={() => {setMenu(0);setIsTmp(0)}}><Link to={'/main/contents'} >전체</Link></li>
                <li className={`${isTmp === 1? 'tabBtnActive': 'tabBtn'}`} onClick={() => {setMenu(1);setIsTmp(1)}}><Link to={'/main/contents'} >임시저장 목록</Link></li>
                <li className={`${menu === 2? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(2)}><Link to={'/main/contents/write'} >작성하기</Link></li>
            </ul>
            <div className="partnerSection">
            
                <div className={"readTop"}>
                <span className="readLeft">
                <form  id="search" onSubmit={handleSearchSubmit}>
                        <input  id="searchBar" type="text" name="search_word" value={search_word || ''} onChange={handleSearchChange} />
                        <input id="searchBtn" type='submit' src={searchImg} />
                    </form>
                    <select  id="select" name={'category'} onChange={handleChange}>
                        <option value={'등록순'} selected={category === '등록순'}>등록순</option>
                        <option value={'공동장 소식'} selected={category === '공동장 소식'}>공동장 소식</option>
                        <option value={'상품 홍보'} selected={category === '상품 홍보'}>상품 홍보</option>
                        <option value={'스토어 홍보'} selected={category === '스토어 홍보'}>스토어 홍보</option>
                        <option value={'이벤트'} selected={category === '이벤트'}>이벤트</option>
                    </select>
                </span>
                <span id="readRight">
                    <button onClick={(event) => handleDeleteClick(event, list, delete_list)}>편집</button>
                    <p className={"Content-count"}>전체 {count}개</p>
                </span>
                </div>
                <form className={"Content-selected"} onSubmit={handleBannerSubmit}>
                    <p>1번 콘텐츠</p>
                    <input type={"number"} name={"banner1"} value={bannerList[0]} onChange={(event) => handleBannerChange(event, bannerList)}/>
                    <p>2번 콘텐츠</p>
                    <input type={"number"} name={"banner2"} value={bannerList[1]} onChange={(event) => handleBannerChange(event, bannerList)}/>
                    <p>3번 콘텐츠</p>
                    <input type={"number"} name={"banner3"} value={bannerList[2]} onChange={(event) => handleBannerChange(event, bannerList)}/>
                    <input type={'submit'} value={'홍보용 배너 변경하기'}/>
                </form>
                <div className={"itemList"}>
                    
                    <table  className="itemListTitle">
                        <thead>
                        <tr>
                        <th style={{width:'20px'}}><input type={"checkbox"}/></th>
                        <th style={{width:'70px'}}>등록 번호</th>
                        <th style={{width:'200px'}}>컨텐츠 명</th>
                        <th style={{width:'100px'}}>분류</th>
                        <th style={{width:'200px'}}>작성 일자</th>
                        <th style={{width:'200px'}}>업로드 일정</th>
                        </tr>
                        </thead>
                    </table>
                    <div className="list_itemview_content">
                    {isTmp === 0 ? renderContentList(list) : renderTmpList(list)}
                    </div>
                   
                </div>
                
            </div>
        
        </div>
        
    )
}

export default ContentsList;