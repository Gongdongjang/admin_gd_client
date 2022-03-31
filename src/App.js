import React, { Component } from "react";
import axios from "axios";
import Store from './Store';
import StoreAdd from "./StoreAdd";
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/Styles';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto"
	},
	table: {
		minWidth: 1080
	}
})

class App extends Component {
	state = {
		stores: ""
	};

	/**USING FETCH */
	// componentDidMount() {
	// 	this.callApi()
	// 		.then(res => this.setState({stores: res}))
	// 		.catch(err => console.log(err));
	// }
	// callApi = async() => {
	// 	const response = await fetch('/api/stores');
	// 	const body = await response.json();
	// 	return body;
	// }
	
	/**USING AXIOS */
	componentDidMount() {
		axios.get('/api/stores').then( res => {
		  this.setState({ stores: res.data })
		});
	}

	render(){
		const { classes } = this.props;
		return(
			<div>
				<Paper className = {classes.root}>
					<h1>스토어 목록</h1>
					<Table className = {classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>스토어 id</TableCell>
								<TableCell>스토어 이름</TableCell>
								<TableCell>스토어 설명</TableCell>
								<TableCell>스토어 영업시간</TableCell>
								<TableCell>스토어 휴무일</TableCell>
								<TableCell>스토어 전화번호</TableCell>
								<TableCell>스토어 유형</TableCell>
								<TableCell>스토어 위치</TableCell>
								<TableCell>스토어 위도</TableCell>
								<TableCell>스토어 경도</TableCell>
								<TableCell>스토어 크기</TableCell>
								<TableCell>스토어 냉장고유무</TableCell>
								<TableCell>스토어 계약기간</TableCell>
								<TableCell>스토어 공구진행여부</TableCell>
								<TableCell>스토어 사진경로</TableCell>
								<TableCell>스토어 사진크기</TableCell>
								<TableCell>스토어 주인번호</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.stores ? this.state.stores.map(c => {return ( 
								<Store 
									key={c.store_id} 
									store_id = {c.store_id}
									store_name = {c.store_name}
									store_info = {c.store_info}
									store_hours = {c.store_hours}
									store_restDays = {c.store_restDays}
									store_phone = {c.store_phone}
									store_type = {c.store_type}
									store_loc = {c.store_loc}
									store_lat = {c.store_lat}
									store_long = {c.store_long}
									store_size = {c.store_size}
									store_fridge = {c.store_fridge}
									store_contractDuration = {c.store_contractDuration}
									store_inProg = {c.store_inProg}
									store_filename = {c.store_filename}
									store_filesize = {c.store_filesize}
									admin_number = {c.admin_number}
								/>
							) }) : "" }
						</TableBody>
					</Table>
				</Paper>
				<StoreAdd/>
			</div>
		);
	}
}

export default withStyles(styles)(App);