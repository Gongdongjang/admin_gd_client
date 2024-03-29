import React, {useCallback, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';

function ContentsDetail() {
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [date, setDate] = useState('');
    const [photo, setPhoto] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [main, setMain] = useState('');
    const [md1, setMd1] = useState();
    const [md2, setMd2] = useState();
    const [category, setCategory] = useState('');

    const {content_id} = useParams();
    const [isTmp, setIsTmp] = useState(0);
    let[menu,setMenu] = useState(0);

    const getContentDetail = useCallback(async () => {
        const res = await axios.get('/api/content/' + content_id);
        const content = res.data;
        setTitle(content.content_title);
        setContext(content.content_context);
        setDate(content.content_date.replace('T', ' ').split('.')[0]);
        setPhoto(content.content_photo);
        setThumbnail(content.content_thumbnail);
        setMain(content.content_main);
        setMd1(content.content_md_id1);
        setMd2(content.content_md_id2);
        setCategory(content.content_category);
    }, [content_id]);

    const DeleteContent = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const res = await axios.delete('/api/content/delete/' + content_id);
            alert(res.data.content_id + '를 삭제했습니다.');
            window.location.replace('/contents/');
        } else {
            alert('삭제를 취소했습니다.');
        }
    }

    useEffect(() => {
        getContentDetail();
    }, [getContentDetail]);

    return (
        <div>
            <ul className="tab">
                <li className={`${isTmp === 0? 'tabBtnActive': 'tabBtn'}`}  onClick={() => {setMenu(0);setIsTmp(0)}}><Link to={'/main/contents'} >전체</Link></li>
                <li className={`${isTmp === 1? 'tabBtnActive': 'tabBtn'}`} onClick={() => {setMenu(1);setIsTmp(1)}}><Link to={'/main/contents'} >임시저장 목록</Link></li>
                <li className={`${menu === 2? 'tabBtnActive': 'tabBtn'}`} onClick={() => setMenu(2)}><Link to={'/main/contents/write'} >작성하기</Link></li>
            </ul>
            <div className="partnerSection">
            <div className='farmPage_container'>
                <div className="farmPageContent">
                <div className='page_title'>
                    <p className="partner_name">{title}</p>
                    <Link to={'/main/contents/update/' + content_id}>
                    <p className="updateBtn">수정하기</p>
                    </Link>
                </div>
                <table className="partnerPage_table" >
                  <tbody>
                    <tr><th>분류</th><th>{category}</th></tr>
                    <tr><th>작성일자</th><th>{date}</th></tr>
                    <tr><th>업로드일자</th><th></th></tr>
                    
                    <tr><th>내용</th><th>{context}</th></tr>
                    
                  </tbody>
                </table>
           
                </div>
                <div className="farmPageReport">
                이미지
                {main &&
                <img src={img_url + main} alt={'main'} height="280" width="280"/>
            }
            {photo &&
                <img src={img_url + photo} alt='content'height="280" width="280"/>
            }
            {thumbnail &&
                <img src={img_url +thumbnail} alt='content'height="280" width="280"/>
            }
                <h2>연결컨텐츠</h2>
                    <p>{md1} {md2}</p>
                </div>
            
            </div>
           
        </div>
        </div>
        
    )
}

export default ContentsDetail;