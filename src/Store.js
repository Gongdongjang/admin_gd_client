import React from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Store extends React.Component {
  render() {
    return (
		<TableRow>
			<TableCell>{this.props.store_id}</TableCell>
			<TableCell>{this.props.store_name}</TableCell>
			<TableCell>{this.props.store_info}</TableCell>
			<TableCell>{this.props.store_hours}</TableCell>
			<TableCell>{this.props.store_restDays}</TableCell>
			<TableCell>{this.props.store_phone}</TableCell>
			<TableCell>{this.props.store_type}</TableCell>
			<TableCell>{this.props.store_loc}</TableCell>
			<TableCell>{this.props.store_lat}</TableCell>
			<TableCell>{this.props.store_long}</TableCell>
			<TableCell>{this.props.store_size}</TableCell>
			<TableCell>{this.props.store_fridge}</TableCell>
			<TableCell>{this.props.store_contractDuration}</TableCell>
			<TableCell>{this.props.store_inProg}</TableCell>
			<TableCell>{this.props.store_filename}</TableCell>
			<TableCell>{this.props.store_filesize}</TableCell>
			<TableCell>{this.props.admin_number}</TableCell>
		</TableRow>
    );
  }
}

export default Store;