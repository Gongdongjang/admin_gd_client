import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Routes, useLocation, useParams} from "react-router-dom";

const img_url = 'https://gdjang.s3.ap-northeast-2.amazonaws.com/';

function ContentsDetail() {
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [date, setDate] = useState('');
    const [photo, setPhoto] = useState('');

    const {content_id} = useParams();

    const getContentDetail = useCallback(async () => {
        const res = await axios.get('/api/content/' + content_id);
        const content = res.data;
        setTitle(content.content_title);
        setContext(content.content_context);
        setDate(content.content_date.replace('T', ' ').split('.')[0]);
        setPhoto(content.content_photo);
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
            <p>{date}</p>
            {photo &&
                <img src={img_url + photo} alt='content'/>
            }
            <p>{context}</p>
        </div>
    )
}

function ContentsWrite() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [context, setContext] = useState('');
    const [link, setLink] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [exist_thumbnail, setExistThumbnail] = useState('');
    const [photo, setPhoto] = useState(null);
    const [exist_photo, setExistPhoto] = useState('');

    const url = useLocation();
    const { content_id } = useParams();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'title') setTitle(value);
        else if (name === 'context') setContext(value);
        else setLink(value);
    }

    const handleFileChange = (event) => {
        const name = event.target.name;
        const file = event.target.files[0];

        if (name === 'thumbnail') setThumbnail(file);
        else if(name === 'photo') setPhoto(file);
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
        } else {
            // 수정 시 새 파일이 있을 때만 보냄
            if (photo) data.append('photo', photo);
            if (thumbnail) data.append('thumbnail', thumbnail);
        }
        data.append('link', link);

        const submitter = event.nativeEvent.submitter.name;
        if (submitter === 'upload_btn') {
            data.append('is_tmp', 'false');

            if (is_update) {
                await axios.patch('/api/content/update/' + content_id, data);
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
                await axios.patch('/api/content/update/' + content_id, data);
                document.location.replace('/contents/' + content_id);
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
        setDate(content.content_date.split('T')[0]);
        setExistPhoto(content.content_photo);
        setExistThumbnail(content.content_thumbnail);
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
                <h3>제목</h3>
                <input type='text' name='title' placeholder='제목을 입력하세요' onChange={handleChange} value={title}/>
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
                <h3>추가 텍스트</h3>
                <textarea maxLength={1000} name='context' placeholder='추가 텍스트를 입력하세요' onChange={handleChange} value={context} />
            </div>
            <div>
                <h3>대표 이미지</h3>
                {exist_thumbnail &&
                    <img src={img_url + exist_thumbnail} alt={'thumbnail'} />
                }
                <input type='file' name='thumbnail' onChange={handleFileChange} />
            </div>
            <div>
                <h3>바로가기 연결</h3>
                <input type='text' onChange={handleChange} placeholder='바로가기로 연결할 링크를 입력하세요' value={link} />
            </div>
            <div>
                <input type='submit' name={'upload_btn'} value={'업로드 하기'}/>
                <input type={'submit'} name={'tmp_btn'} value={'임시저장 하기'}/>
            </div>
        </form>
    )
}

function ContentsList() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState('');
    const [search_word, setSearchWord] = useState('');
    const [is_delete, setIsDelete] = useState(false);

    const handleDeleteContent = async (event, content_id) => {
        // link 기능 제거
        event.preventDefault();

        console.log(content_id);
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const res = await axios.delete('/api/content/delete/' + content_id);
            alert(res.data.content_id + '를 삭제했습니다.');
            window.location.replace('/contents/');
        } else {
            alert('삭제를 취소했습니다.');
        }
    }

    const getContentList = useCallback(async () => {
        const res = await axios.get('/api/content');
        setCount(res.data.length);
        setList(res.data.map((content) => {
              let src = img_url + content.content_thumbnail;

              return [
                  <Link to={'/contents/' + content.content_id}>
                      <div>
                          {is_delete && <button onClick={(event) => handleDeleteContent(event, content.content_id)}>x</button>}
                          <img src={src} height='120' alt='thumbnail'/>
                          <h3>{content.content_title}</h3>
                          <p>{content.content_context}</p>
                      </div>
                  </Link>
              ]
          })
        );
    }, [is_delete])

    useEffect(() => {
        getContentList();
    }, [getContentList])

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

    const handleDeleteClick = () => {
        setIsDelete(!is_delete);
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
                  <button onClick={handleDeleteClick}>편집</button>
                  <Link to={'/contents/write'} >
                      <button>+ 새로운 콘텐츠 등록하기</button>
                  </Link>
              </div>
              <h3>콘텐츠 모아보기</h3>
              {list}
          </div>
      </div>
    )
}

// class ContentsList extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0,
//             list: '',
//             search_word: ''
//         };
//
//         this.handleSearchChange = this.handleSearchChange.bind(this);
//         this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
//     }
//
//     handleSearchChange(event) {
//         this.setState({
//             [event.target.name]: event.target.value
//         });
//     }
//
//     async componentDidMount() {
//         const res = await axios.get('/api/content');
//         this.setState({
//             count: res.data.length,
//             list: res.data.map((content) => {
//                 let src =  img_url + content.content_thumbnail;
//
//                 return [
//                     <Link to={'/contents/' + content.content_id}>
//                         <div>
//                             <img src={src} height='120' alt='thumbnail'/>
//                             <h3>{content.content_title}</h3>
//                             <p>{content.content_context}</p>
//                         </div>
//                     </Link>
//                 ]
//             })
//         });
//     }
//
//     async handleSearchSubmit(event) {
//         event.preventDefault();
//
//         const res = await axios.get(`/api/content/search?title=${this.state.search_word}`);
//         this.setState({
//             list: res.data.map((content) => {
//                 let src = img_url + content.content_thumbnail;
//
//                 return [
//                     <Link to={'/contents/' + content.content_id}>
//                         <div>
//                             <img src={src} height='120' alt='thumbnail'/>
//                             <h3>{content.content_title}</h3>
//                             <p>{content.content_context}</p>
//                         </div>
//                     </Link>
//                 ]
//             })
//         });
//     }
//
//     render(){
//         return (
//             <div className="section">
//                 <div>
//                     <p>지금까지 업로드된 콘텐츠 수</p>
//                     <h2>{this.state.count} 개</h2>
//                     <div>
//                         <form onSubmit={this.handleSearchSubmit}>
//                             <input type="text" name="search_word" value={this.state.search_word || ''} onChange={this.handleSearchChange} />
//                             <input type='submit' value='검색' />
//                         </form>
//                         <button>편집</button>
//                         <Link to={'/contents/write'} >
//                             <button>+ 새로운 콘텐츠 등록하기</button>
//                         </Link>
//                     </div>
//                     <h3>콘텐츠 모아보기</h3>
//                     {this.state.list}
//                 </div>
//             </div>
//         );
//     };
// }

function Contents() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<ContentsList />}/>
                <Route path='/:content_id' element={<ContentsDetail />}/>
                <Route path='/write' element={<ContentsWrite />}/>
                <Route path='/update/:content_id' element={<ContentsWrite />}/>
            </Routes>
        </div>
    )
}

export default Contents;
