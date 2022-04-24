import React from "react";
import axios from "axios";

class Contents extends React.Component{
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

    async componentDidMount() {
        const res = await axios.get('/api/content');
        this.setState({
            count: res.data.length,
            list: res.data.map((content) => {
                let src = 'https://gdjang.s3.ap-northeast-2.amazonaws.com/' + content.content_thumbnail;

                return [
                    <div>
                        <img src={src} height='120' alt='thumbnail'/>
                        <h3>{content.content_title}</h3>
                        <p>{content.content_context}</p>
                    </div>
                ]
            })
        });
    }

    handleSearchChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSearchSubmit(event) {
        event.preventDefault();

        const res = await axios.get(`/api/content/search?title=${this.state.search_word}`);
        this.setState({
            list: res.data.map((content) => {
                let src = 'https://gdjang.s3.ap-northeast-2.amazonaws.com/' + content.content_thumbnail;

                return [
                    <div>
                        <img src={src} height='120' alt='thumbnail'/>
                        <h3>{content.content_title}</h3>
                        <p>{content.content_context}</p>
                    </div>
                ]
            })
        });
    }

    render(){
        return (
            <div  className="section">
                <div>
                    <p>지금까지 업로드된 콘텐츠 수</p>
                    <h2>{this.state.count} 개</h2>
                    <div>
                        <form onSubmit={this.handleSearchSubmit}>
                            <input type="text" name="search_word" value={this.state.search_word || ''} onChange={this.handleSearchChange} />
                            <input type='submit' value='검색' />
                        </form>
                    </div>
                    <h3>콘텐츠 모아보기</h3>
                    {this.state.list}
                </div>
            </div>
        );
    };
}
export default Contents;