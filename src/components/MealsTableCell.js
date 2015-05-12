'use strict';

import React from 'react/addons';

export default React.createClass({

	componentDidMount() {
		this.refs.field.getDOMNode().value = this.props.data;
	},

	onEditCancel() {
		setTimeout(() => {
			let rowEl = this._owner.getDOMNode();
			if (!rowEl.contains(document.activeElement)) {
				rowEl.classList.remove('edit');
				this.refs.field.getDOMNode().value = this.props.data;
			}
		}, 1);
	},

	formatDate(created) {
		let date = new Date(created);
		return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
	},

	render(){
		let key = this.props.rowData.key;
		let name = this.props.metadata.columnName;
		return (
			<div className={this.props.rowData.hasExceedDailyCalories ? 'exceeded cell' : 'cell'}>
				<span>{this.props.metadata.type === 'date' ? this.formatDate(this.props.data) : this.props.data}</span>
				<input 
					ref="field" 
					data-key={name + '-' + key} 
					type="text"
					onBlur={this.onEditCancel.bind(this, key)}/>
			</div>
		);
	}

});
