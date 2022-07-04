import React from 'react';
import PropTypes from 'prop-types';
import { Player } from '../../model/player';
import { COLOR } from '../../model/enums/color';
import { Board } from '../../model/board';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FIGURES } from '../../model/enums/figures';
import TimeComponent from '../time/timeComponent';

const renderKilledFigures = (figures, color) => {
	const sortOrder = [FIGURES.PAWN, FIGURES.BISHOP, FIGURES.KNIGHT, FIGURES.ROOK, FIGURES.QUEEN];

	const reducedFigures = Object.values(
		figures.reduce((acc, figure) => {
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

	return (
		<>
			{reducedFigures.map(({ figure, count }) => {
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

const BoardLegendComponent = ({ activePlayer, whiteTime, blackTime, board }) => {
	const blackTakes = board.getKilledFigures(COLOR.WHITE);
	const whiteTakes = board.getKilledFigures(COLOR.BLACK);

	return (
		<div className='board-legend'>
			<h3 className='board-legend-header'>Current player: {activePlayer.color}</h3>

			<div className='board-legend-section'>
				<h3>Black player</h3>
				<div>
					Time: <TimeComponent time={blackTime} />
				</div>
				<div>Takes:{renderKilledFigures(blackTakes, 'white')}</div>
				<div>Scores:</div>
			</div>

			<div className='board-legend-section'>
				<h3>White player</h3>
				<div>
					Time: <TimeComponent time={whiteTime} />
				</div>
				<div>Takes: {renderKilledFigures(whiteTakes, 'black')}</div>
				<div>Scores:</div>
			</div>
		</div>
	);
};

BoardLegendComponent.propTypes = {
	activePlayer: PropTypes.instanceOf(Player),
	whiteTime: PropTypes.number,
	blackTime: PropTypes.number,
	board: PropTypes.instanceOf(Board),
};

export default BoardLegendComponent;
