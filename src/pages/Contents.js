import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Routes, useLocation, useParams} from "react-router-dom";

const img_url = 'https://gdjang.s3.ap-northeast-2.amazonaws.com/';

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
        <form onSubmit={handleSubmit}>
            <div>
                <h3>콘텐츠 분류</h3>
                <select name={'category'} onChange={handleChange}>
                    <option value={'공동장 소식'} selected={category === '공동장 소식'}>공동장 소식</option>
                    <option value={'상품 홍보'} selected={category === '상품 홍보'}>상품 홍보</option>
                    <option value={'스토어 홍보'} selected={category === '스토어 홍보'}>스토어 홍보</option>
                    <option value={'이벤트'} selected={category === '이벤트'}>이벤트</option>
                </select>
            </div>
            <div>
                <h3>제목</h3>
                <input type='text' name='title' placeholder='제목을 입력하세요' onChange={handleChange} value={title}/>
            </div>
            <div>
                <h3>콘텐츠 내용</h3>
                <textarea maxLength={1000} name='context' placeholder='콘텐츠 내용을 입력하세요' onChange={handleChange} value={context} />
            </div>
            <div>
                <h3>관련 URL 입력</h3>
                <input type='text' onChange={handleChange} placeholder='http://' value={link} />
            </div>
            <div>
                <h3>발행 유형</h3>
                <label>실시간</label>
                <input type={"radio"} name={'upload_type'} value={'실시간'} onChange={handleChange}/>
                <label>예약</label>
                <input type={"radio"} name={'upload_type'} value={'예약'} onChange={handleChange}/>
            </div>
            <div>
                <h3>발행 날짜</h3>
                <input type={"datetime-local"} name={'upload_date'} value={upload_date} onChange={handleChange}/>
            </div>
            <div>
                <h3>날짜</h3>
                <p>{date}</p>
            </div>
            <div>
                <h3>콘텐츠 이미지</h3>
                {exist_photo &&
                    <img src={img_url + exist_photo} alt={'thumbnail'} />
                }
                <input type='file' name='photo' onChange={handleFileChange} />
            </div>
            <div>
                <h3>대표 이미지</h3>
                {exist_thumbnail &&
                    <img src={img_url + exist_thumbnail} alt={'thumbnail'} />
                }
                <input type='file' name='thumbnail' onChange={handleFileChange} />
            </div>
            <div>
                <h3>메인 이미지</h3>
                {existMain &&
                    <img src={img_url + existMain} onChange={handleFileChange} />
                }
                <input type='file' name='main' onChange={handleFileChange} />
            </div>
            <div>
                <input type='submit' name={'upload_btn'} value={'업로드 하기'}/>
                <input type={'submit'} name={'tmp_btn'} value={'임시저장 하기'}/>
                <button type={"button"} onClick={(e) => { e.preventDefault(); document.location.href='/contents/tmp'; }}>임시저장 리스트</button>
            </div>
        </form>
    )
}

function ContentsTmp() {
    const [list, setList] = useState('');
    const [is_delete, setIsDelete] = useState(false);

    const handleDeleteClick = () => {
        setIsDelete(!is_delete);
    }

    const getTmpList = useCallback(async () => {
        const res = await axios.get('/api/content/tmp');
        setList(res.data.map((content) => {
                return [
                    <Link to={'/contents/update/' + content.content_id}>
                        <div style={{backgroundColor: "gray"}}>
                            {is_delete && <button>x</button>}
                            <p>{content.content_context}</p>
                            <p>{content.content_date}</p>
                        </div>
                    </Link>
                ]
            })
        );
    }, [is_delete])

    useEffect(() => {
        getTmpList();
    }, [getTmpList])

    return (
        <div>
            <h1>임시저장 리스트</h1>
            <button onClick={handleDeleteClick}>편집</button>
            {list}
            <button>취소</button>
        </div>
    )
}

function ContentsList() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [search_word, setSearchWord] = useState('');
    const [is_delete, setIsDelete] = useState(false);
    const [delete_list, setDeleteList] = useState([]);

    const handleClickCheckbox = async (event, delete_list) => {
        const deleteIndex = event.target.value;

        if (delete_list.includes(deleteIndex)) {
            setDeleteList(delete_list.filter((index) => deleteIndex !== index));
        } else {
            setDeleteList([...delete_list, deleteIndex]);
        }

        console.log(delete_list);
    }

    const fetchContentList = async () => {
        const res = await axios.get('/api/content?aspect=admin');
        setCount(res.data.length);
        setList(res.data);
    }

    const renderContentList = (list) => {
        return list.map((content) => {
            let src = img_url + content.content_thumbnail;

            return [
                    <div>
                        {/*{is_delete && <button onClick={(event) => handleDeleteContent(event, content.content_id)}>x</button>}*/}
                        <input type={"checkbox"} value={content.content_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/>
                        <Link to={'/contents/' + content.content_id}>
                            <img src={src} height='120' alt='thumbnail'/>
                            <h3>{content.content_title}</h3>
                            <p>{content.content_context}</p>
                        </Link>
                    </div>
            ]
        })
    }

    // const getContentList = useCallback(async () => {
    //     const res = await axios.get('/api/content?aspect=admin');
    //     setCount(res.data.length);
    //     setList(res.data.map((content) => {
    //           let src = img_url + content.content_thumbnail;
    //
    //           return [
    //               <Link to={'/contents/' + content.content_id}>
    //                   <div>
    //                       {/*{is_delete && <button onClick={(event) => handleDeleteContent(event, content.content_id)}>x</button>}*/}
    //                       <input type={"checkbox"} value={content.content_id} onClick={(event) => handleClickCheckbox(event, delete_list)}/>
    //                       <img src={src} height='120' alt='thumbnail'/>
    //                       <h3>{content.content_title}</h3>
    //                       <p>{content.content_context}</p>
    //                   </div>
    //               </Link>
    //           ]
    //       })
    //     );
    // }, [is_delete, handleClickCheckbox])

    useEffect(() => {
        fetchContentList()
    }, [])

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value);
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        const res = await axios.get(`/api/content/search?title=${search_word}`);
        setList(res.data.map((content) => {
                let src = img_url + content.content_thumbnail;

                return [
                    <Link to={'/contents/' + content.content_id}>
                        <div>
                            <img src={src} height='120' alt='thumbnail'/>
                            <h3>{content.content_title}</h3>
                            <p>{content.content_context}</p>
                        </div>
                    </Link>
                ]
            })
        );
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

    return (
      <div className="section">
          <div>
              <p>지금까지 업로드된 콘텐츠</p>
              <h2>{count} 개</h2>
              <div>
                  <form onSubmit={handleSearchSubmit}>
                      <input type="text" name="search_word" value={search_word || ''} onChange={handleSearchChange} />
                      <input type='submit' value='검색' />
                  </form>
                  <button onClick={(event) => handleDeleteClick(event, list, delete_list)}>편집</button>
                  <Link to={'/contents/write'} >
                      <button>+ 새로운 콘텐츠 등록하기</button>
                  </Link>
              </div>
              <h3>콘텐츠 모아보기</h3>
              {renderContentList(list)}
          </div>
      </div>
    )
}


function Contents() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<ContentsList />}/>
                <Route path='/:content_id' element={<ContentsDetail />}/>
                <Route path='/write' element={<ContentsWrite />}/>
                <Route path='/update/:content_id' element={<ContentsWrite />}/>
                <Route path='/tmp' element={<ContentsTmp />}/>
            </Routes>
        </div>
    )
}

export default Contents;
