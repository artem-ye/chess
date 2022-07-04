import React from 'react';
import PropTypes from 'prop-types';
import { COLOR } from '../../model/enums/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colorToCssStyle = (color) => {
	return color === COLOR.WHITE ? 'white' : 'black';
};

const CellComponent = ({ cell, onClick, isActive, isHighlighted }) => {
	const style = isHighlighted && cell.piece ? { backgroundColor: '#e05151' } : {};

	return (
		<div
			className={`cell ${colorToCssStyle(cell.color)} ${isActive ? 'active' : ''} `}
			style={style}
			onClick={() => onClick(cell)}
		>
			{cell.piece && (
				<FontAwesomeIcon
					icon={cell.piece.icon}
					className={`figure  ${colorToCssStyle(cell.piece.color)}`}
					size='4x'
				/>
			)}
			{isHighlighted && !cell.piece && <div className='highlighted' />}
		</div>
	);
};

CellComponent.propTypes = {
	cell: PropTypes.object,
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
	isHighlighted: PropTypes.bool,
};

export default CellComponent;
