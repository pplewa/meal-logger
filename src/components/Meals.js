'use strict';

import React from 'react/addons';
import MealsTable from './MealsTable';
import Navigation from './Navigation';
import AddMeal from './AddMeal';
import 'styles/Meals.css';
import 'purecss/build/tables.css';

export default React.createClass({

	render() {
		return (
			<div>
				<Navigation {...this.props} />
				<div className="Meals">
					<AddMeal {...this.props} />
					<MealsTable {...this.props} />
				</div>
			</div>
		);
	}
});
