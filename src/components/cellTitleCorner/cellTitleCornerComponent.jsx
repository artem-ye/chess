import React from 'react';
import PropTypes from 'prop-types';
import { getCssColor } from '../../helpers/getCssColor';

const CellTitleCornerComponent = ({ color }) => {
	const cssColor = getCssColor(color);
	return <div className={`cell-title-corner ${cssColor}`} />;
};

CellTitleCornerComponent.propTypes = {
	color: PropTypes.string.isRequired,
};

export default CellTitleCornerComponent;
