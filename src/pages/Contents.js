import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Routes, useParams} from "react-router-dom";

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

    useEffect(() => {
        getContentDetail();
    }, [getContentDetail]);

    return (
        <div>
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
    const [context, setContext] = useState('');
    const [link, setLink] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [photo, setPhoto] = useState(null);

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

        const data = new FormData();
        data.append('title', title);
        data.append('context', context);
        data.append('photo', photo);
        data.append('thumbnail', thumbnail);
        data.append('link', link);

        const submitter = event.nativeEvent.submitter.name;
        if (submitter === 'upload_btn') {
            if (title === '' || context === '' || thumbnail === null) {
                alert('모든 입력창에 입력해야 합니다.');
            } else {
                data.append('is_tmp', 'false');
                const res = await axios.post('/api/content', data);
                document.location.replace('/contents/' + res.data.id);
            }
        } else {
            data.append('is_tmp', 'true');
            await axios.post('/api/content', data);
            document.location.replace('/contents');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>제목</h3>
                <input type='text' name='title' placeholder='제목을 입력하세요' onChange={handleChange} value={title}/>
            </div>
            <div>
                <h3>날짜</h3>
                <p>{new Date(Date.now()).toISOString().split('T')[0]}</p>
            </div>
            <div>
                <h3>콘텐츠 이미지</h3>
                <input type='file' name='photo' onChange={handleFileChange} />
            </div>
            <div>
                <h3>추가 텍스트</h3>
                <textarea maxLength={1000} name='context' placeholder='추가 텍스트를 입력하세요' onChange={handleChange}>{context}</textarea>
            </div>
            <div>
                <h3>대표 이미지</h3>
                <input type='file' name='thumbnail' onChange={handleFileChange} />
            </div>
            <div>
                <h3>바로가기 연결</h3>
                <input type='text' onChange={handleChange} placeholder='바로가기로 연결할 링크를 입력하세요' />
            </div>
            <div>
                <input type='submit' name={'upload_btn'} value={'업로드 하기'}/>
                <input type={'submit'} name={'tmp_btn'} value={'임시저장 하기'}/>
            </div>
        </form>
    )
}

class ContentsList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            list: '',
            search_word: ''
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async componentDidMount() {
        const res = await axios.get('/api/content');
        this.setState({
            count: res.data.length,
            list: res.data.map((content) => {
                let src =  img_url + content.content_thumbnail;

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
        });
    }

    async handleSearchSubmit(event) {
        event.preventDefault();

        const res = await axios.get(`/api/content/search?title=${this.state.search_word}`);
        this.setState({
            list: res.data.map((content) => {
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
        });
    }

    render(){
        return (
            <div className="section">
                <div>
                    <p>지금까지 업로드된 콘텐츠 수</p>
                    <h2>{this.state.count} 개</h2>
                    <div>
                        <form onSubmit={this.handleSearchSubmit}>
                            <input type="text" name="search_word" value={this.state.search_word || ''} onChange={this.handleSearchChange} />
                            <input type='submit' value='검색' />
                        </form>
                        <button>편집</button>
                        <Link to={'/contents/write'} >
                            <button>+ 새로운 콘텐츠 등록하기</button>
                        </Link>
                    </div>
                    <h3>콘텐츠 모아보기</h3>
                    {this.state.list}
                </div>
            </div>
        );
    };
}

function Contents() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<ContentsList />}/>
                <Route path='/:content_id' element={<ContentsDetail />}/>
                <Route path='/write' element={<ContentsWrite />}/>
            </Routes>
        </div>
    )
}

export default Contents;