import React from 'react';
import PropTypes from 'prop-types';
import { Player } from '../../model/player';
import TimeComponent from '../time/timeComponent';
import CapturedPiecesComponent from './capturedPieces';

const BoardLegendComponent = ({ activePlayer, whiteTime, blackTime, blackCaptures, whiteCaptures }) => {
	return (
		<div className='board-legend'>
			<h3 className='board-legend-header'>Current player: {activePlayer.color}</h3>

			<div className='board-legend-section'>
				<h3>Black player</h3>
				<div>
					Time: <TimeComponent time={blackTime} />
				</div>
				<div>
					Captures: <CapturedPiecesComponent piecesArray={blackCaptures} color='white' />
				</div>
			</div>

			<div className='board-legend-section'>
				<h3>White player</h3>
				<div>
					Time: <TimeComponent time={whiteTime} />
				</div>
				<div>
					Captures: <CapturedPiecesComponent piecesArray={whiteCaptures} color='black' />
				</div>
			</div>
		</div>
	);
};

BoardLegendComponent.propTypes = {
	activePlayer: PropTypes.instanceOf(Player),
	whiteTime: PropTypes.number,
	blackTime: PropTypes.number,
	blackCaptures: PropTypes.array,
	whiteCaptures: PropTypes.array,
	// board: PropTypes.instanceOf(Board),
	// board: PropTypes.object,
};

BoardLegendComponent.defaultProps = {
	whiteTime: 0,
	blackTime: 0,
	board: {},
};

export default BoardLegendComponent;
