import React from 'react';
import PropTypes from 'prop-types';
import { COLOR } from '../../model/enums/color';

const TITLE_ORIENTATION = {
	VERTICAL: 'VERTICAL',
	HORIZONTAL: 'HORIZONTAL',
};

const CellTitleComponent = ({ data, orientation, color }) => {
	const orientationStyle = orientation === TITLE_ORIENTATION.HORIZONTAL ? 'horizontal' : 'vertical';
	const colorStyle = color === COLOR.BLACK ? 'black' : 'white';

	return <div className={`cell-title-${orientationStyle} ${colorStyle}`}>{data}</div>;
};

CellTitleComponent.propTypes = {
	data: PropTypes.any,
	orientation: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
};

export { TITLE_ORIENTATION };

export default CellTitleComponent;
