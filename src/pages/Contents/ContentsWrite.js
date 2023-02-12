import React, {useCallback, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";

const img_url = 'https://ggdjang.s3.ap-northeast-2.amazonaws.com/';

function ContentsWrite() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [upload_date, setUpload_date] = useState('');
    const [upload_type, setUpload_type] = useState('');
    const [context, setContext] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('공동장을 이용해야 하는 이유')
    const [thumbnail, setThumbnail] = useState(null);
    const [exist_thumbnail, setExistThumbnail] = useState('');
    const [photo, setPhoto] = useState(null);
    const [exist_photo, setExistPhoto] = useState('');
    const [main, setMain] = useState(null);
    const [existMain, setExistMain] = useState('');

    const url = useLocation();
    const { content_id } = useParams();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case 'title': setTitle(value); break;
            case 'context': setContext(value); break;
            case 'upload_date': setUpload_date(value); break;
            case 'upload_type': setUpload_type(value); break;
            case 'category': setCategory(value); break;
            case 'link': setLink(value); break;
        }
    }

    const handleFileChange = (event) => {
        const name = event.target.name;
        const file = event.target.files[0];

        if (name === 'thumbnail') setThumbnail(file);
        else if(name === 'photo') setPhoto(file);
        else if(name === 'main') setMain(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const is_update = url.pathname.includes('update');
        const data = new FormData();
        data.append('title', title);
        data.append('context', context);
        if (!is_update) {
            // 수정이 아닌 작성시 무조건 보냄
            data.append('photo', photo);
            data.append('thumbnail', thumbnail);
            data.append('main', main);
        } else {
            // 수정 시 새 파일이 있을 때만 보냄
            if (photo) data.append('photo', photo);
            if (thumbnail) data.append('thumbnail', thumbnail);
            if (main) data.append('main', main);
        }
        data.append('link', link);
        data.append('category', category);
        data.append('upload_type', upload_type);
        data.append('upload_date', upload_date);

        const submitter = event.nativeEvent.submitter.name;
        if (submitter === 'upload_btn') {
            data.append('is_tmp', 'false');

            if (is_update) {
                await axios.patch('/api/content/' + content_id, data);
                document.location.replace('/contents/' + content_id);
            } else {
                if (title === '' || context === '' || thumbnail === null) {
                    alert('모든 입력창에 입력해야 합니다.');
                }  else {
                    const res = await axios.post('/api/content', data);
                    document.location.replace('/contents/' + res.data.id);
                }
            }
        } else {
            data.append('is_tmp', 'true');
            if (is_update) {
                await axios.patch('/api/content/' + content_id, data);
                document.location.replace('/contents');
            } else {
                await axios.post('/api/content', data);
                document.location.replace('/contents');
            }
        }
    }

    const getUpdateContent = useCallback(async () => {
        const res = await axios.get('/api/content/' + content_id);
        const content = res.data;
        setTitle(content.content_title);
        setContext(content.content_context);
        setLink(content.content_link);
        setDate(content.content_date.split('T')[0]);
        setCategory(content.content_category);
        setExistPhoto(content.content_photo);
        setExistThumbnail(content.content_thumbnail);
        setExistMain(content.content_main);
    }, [content_id]);

    useEffect(() => {
        setDate(new Date(Date.now()).toISOString().split('T')[0]);
        if (url.pathname.includes('update')) {
            getUpdateContent();
        }
    }, [getUpdateContent, url]);

    return (
        <form className={"Content-container"} onSubmit={handleSubmit}>
            <div className={"Content-content"}>
                <div className={"Content-inputPlace"}>
                    <div className={"Content-inputText"}>
                        <div>
                            <p className={"Content-inputTitle"}>콘텐츠 분류</p>
                            <select className={"Content-category"} name={'category'} onChange={handleChange}>
                                <option value={'공동장 소식'} selected={category === '공동장 소식'}>공동장 소식</option>
                                <option value={'상품 홍보'} selected={category === '상품 홍보'}>상품 홍보</option>
                                <option value={'스토어 홍보'} selected={category === '스토어 홍보'}>스토어 홍보</option>
                                <option value={'이벤트'} selected={category === '이벤트'}>이벤트</option>
                            </select>
                        </div>
                        <div>
                            <p className={"Content-inputTitle"}>제목</p>
                            <input className={"Content-input"} type='text' name='title' placeholder='제목을 입력하세요' onChange={handleChange} value={title}/>
                        </div>
                        <div>
                            <p className={"Content-inputTitle"}>콘텐츠 내용</p>
                            <textarea className={"Content-input"} maxLength={1000} name='context' placeholder='콘텐츠 내용을 입력하세요' onChange={handleChange} value={context} />
                        </div>
                        <div>
                            <p className={"Content-inputTitle"}>관련 URL 입력</p>
                            <input className={"Content-input"} type='text' name={"link"} onChange={handleChange} placeholder='http://' value={link} />
                        </div>
                        <div>
                            <p className={"Content-inputTitle"}>발행 유형</p>
                            <label>실시간</label>
                            <input type={"radio"} name={'upload_type'} value={'실시간'} onChange={handleChange}/>
                            <label>예약</label>
                            <input type={"radio"} name={'upload_type'} value={'예약'} onChange={handleChange}/>
                        </div>
                        <div>
                            <p className={"Content-inputTitle"}>발행 날짜</p>
                            <input type={"datetime-local"} name={'upload_date'} value={upload_date} onChange={handleChange}/>
                        </div>
                        <div>
                            <p className={"Content-inputTitle"}>날짜</p>
                            <p>{date}</p>
                        </div>
                    </div>
                    <div className={"Content-inputImage"}>
                        <div>
                            <p className={"Content-inputTitle"}>썸네일 이미지</p>
                            {exist_thumbnail &&
                                <img src={img_url + exist_thumbnail} alt={'thumbnail'} />
                            }
                            <input type='file' name='thumbnail' onChange={handleFileChange} />
                        </div>
                        <div>
                            <p className={"Content-inputTitle"}>메인 이미지</p>
                            {existMain &&
                                <img src={img_url + existMain} alt={'main'} onChange={handleFileChange} />
                            }
                            <input type='file' name='main' onChange={handleFileChange} />
                        </div>
                        <div>
                            <p className={"Content-inputTitle"}>본문 이미지</p>
                            {exist_photo &&
                                <img src={img_url + exist_photo} alt={'photo'} />
                            }
                            <input type='file' name='photo' onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
                <div className={"Content-btnPlace"}>
                    <input className={"Content-writeBtn"} type='submit' name={'upload_btn'} value={'보내기'}/>
                    <input className={"Content-btn"} type={'submit'} name={'tmp_btn'} value={'임시저장'}/>
                </div>
            </div>
        </form>
    )
}

export default ContentsWrite;