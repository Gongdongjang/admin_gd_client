import React from "react";
import { post } from 'axios';

class StoreAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            store_id: '',
            store_name: '',
            store_info: '',
            store_hours: '',
            store_restDays: '',
            store_phone: '',
            store_type: '',
            store_loc: '',
            store_lat: '',
            store_long: '',
            store_size: '',
            store_fridge: '', 
            store_contractDuration: '',
            store_inProg: '',
            store_filename: '',
            store_filesize: '',
            admin_number: '' 
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addStore()
            .then((response) => {
                console.log(response.data);
        })
        this.setState({
            file: null,
            store_id: '',
            store_name: '',
            store_info: '',
            store_hours: '',
            store_restDays: '',
            store_phone: '',
            store_type: '',
            store_loc: '',
            store_lat: '',
            store_long: '',
            store_size: '',
            store_fridge: '', 
            store_contractDuration: '',
            store_inProg: '',
            store_filename: '',
            store_filesize: '',
            admin_number: '' 
        });
        //window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            store_filename: e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addStore = () => {
        const url = '/api/stores';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('store_name', this.state.store_name);
        formData.append('store_info', this.state.store_info);
        formData.append('store_hours', this.state.store_hours);
        formData.append('store_restDays', this.state.store_restDays);
        formData.append('store_phone', this.state.store_phone);
        formData.append('store_type', this.state.store_type);
        formData.append('store_loc', this.state.store_loc);
        formData.append('store_lat', this.state.store_lat);
        formData.append('store_long', this.state.store_long);
        formData.append('store_size', this.state.store_size);
        formData.append('store_fridge', this.state.store_fridge);
        formData.append('store_contractDuration', this.state.store_contractDuration);
        formData.append('store_inProg', this.state.store_inProg);
        formData.append('admin_number', this.state.admin_number);
        const config = {
            headers: {
                'content-type': 'multipart/form-data' //전달하고자하는데이터에파일이포함되어있으면써줘야함
            }
        }
        return post(url, formData, config);
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>스토어 등록</h1>
                스토어 이미지: <input type="file" name="file" file={this.state.file} value={this.state.store_filename} onChange={this.handleFileChange}/><br/>
                스토어 이름: <input type="text" name="store_name" value={this.state.store_name} onChange={this.handleValueChange}/><br/>
                스토어 설명: <input type="text" name="store_info" value={this.state.store_info} onChange={this.handleValueChange}/><br/>
                스토어 영업시간: <input type="text" name="store_hours" value={this.state.store_hours} onChange={this.handleValueChange}/><br/>
                스토어 휴무일: <input type="text" name="store_restDays" value={this.state.store_restDays} onChange={this.handleValueChange}/><br/>
                스토어 전화번호: <input type="text" name="store_phone" value={this.state.store_phone} onChange={this.handleValueChange}/><br/>
                스토어 유형: <input type="text" name="store_type" value={this.state.store_type} onChange={this.handleValueChange}/><br/>
                스토어 위치: <input type="text" name="store_loc" value={this.state.store_loc} onChange={this.handleValueChange}/><br/>
                스토어 위도: <input type="number" step="any" name="store_lat" value={this.state.store_lat} onChange={this.handleValueChange}/><br/>
                스토어 경도: <input type="number" step="any" name="store_long" value={this.state.store_long} onChange={this.handleValueChange}/><br/>
                스토어 크기: <input type="text" name="store_size" value={this.state.store_size} onChange={this.handleValueChange}/><br/>
                스토어 냉장고유무: <input type="number" name="store_fridge" value={this.state.store_fridge} onChange={this.handleValueChange}/><br/>
                스토어 계약기간: <input type="text" name="store_contractDuration" value={this.state.store_contractDuration} onChange={this.handleValueChange}/><br/>
                스토어 공구진행여부: <input type="number" name="store_inProg" value={this.state.store_inProg} onChange={this.handleValueChange}/><br/>
                스토어 주인번호: <input type="number" name="admin_number" value={this.state.admin_number} onChange={this.handleValueChange}/><br/>
                <button type="submit">등록하기</button>
            </form>
        )
    }
}

export default StoreAdd;