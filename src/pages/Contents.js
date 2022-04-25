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
                        <button>+ 새로운 콘텐츠 등록하기</button>
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
            </Routes>
        </div>
    )
}

export default Contents;