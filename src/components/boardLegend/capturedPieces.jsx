import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PIECES_TYPES } from '../../model/enums/piecesTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useEffect } from 'react';
// import { useEffect } from 'react';

const reducePiecesArray = (piecesArray) => {
	const sortOrder = [
		PIECES_TYPES.PAWN,
		PIECES_TYPES.BISHOP,
		PIECES_TYPES.KNIGHT,
		PIECES_TYPES.ROOK,
		PIECES_TYPES.QUEEN,
	];

	return Object.values(
		piecesArray.reduce((acc, figure) => {
			if (figure.type in acc) {
				acc[figure.type].count++;
			} else {
				acc[figure.type] = {
					count: 1,
					figure,
				};
			}

			return acc;
		}, {})
	).sort((a, b) => {
		return sortOrder.indexOf(a.figure.type) > sortOrder.indexOf(b.figure.type) ? 1 : -1;
	});
};

const CapturedPiecesComponent = ({ piecesArray, color }) => {
	const reducedPieces = useCallback(reducePiecesArray(piecesArray), [piecesArray]);

	// console.log('Captured pieces rendering...');

	// useEffect(() => {
	// 	console.log('Color changed', color);
	// }, [color]);

	// useEffect(() => {
	// 	console.log('piecesArray changed', color);
	// }, [piecesArray]);

	return (
		<>
			{reducedPieces.map(({ figure, count }) => {
				return (
					<span key={figure.id} className='legend-killed-figure'>
						<FontAwesomeIcon icon={figure.icon} className={`figure  ${color}`} size='1x' />
						{count > 1 && `[x${count}]`}&nbsp;
					</span>
				);
			})}
		</>
	);
};

CapturedPiecesComponent.propTypes = {
	piecesArray: PropTypes.array,
	color: PropTypes.string,
};

export default CapturedPiecesComponent;
