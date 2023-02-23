import React, {useCallback, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';

function ContentsDetail() {
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [date, setDate] = useState('');
    const [photo, setPhoto] = useState('');
    const [main, setMain] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');

    const {content_id} = useParams();

    const getContentDetail = useCallback(async () => {
        const res = await axios.get('/api/content/' + content_id);
        const content = res.data;
        setTitle(content.content_title);
        setContext(content.content_context);
        setDate(content.content_date.replace('T', ' ').split('.')[0]);
        setPhoto(content.content_photo);
        setMain(content.content_main);
        setLink(content.content_link);
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
            <div>
                <Link to={'/contents/update/' + content_id}>
                    <button>수정</button>
                </Link>
                <button onClick={DeleteContent}>삭제</button>
            </div>
            <h3>{title}</h3>
            <p>{category}</p>
            <p>{date}</p>
            {main &&
                <img src={img_url + main} alt={'main'}/>
            }
            {photo &&
                <img src={img_url + photo} alt='content'/>
            }
            <p>{context}</p>
            {link &&
                <a href={link}>바로가기 링크</a>
            }
        </div>
    )
}

export default ContentsDetail;