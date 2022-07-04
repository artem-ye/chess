import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { COLOR } from '../../model/enums/color';
import CellComponent from '../cell/cellComponent';
import CellTitleComponent, { TITLE_ORIENTATION } from '../cellTitle/cellTitleComponent';
import CellTitleCornerComponent from '../cellTitleCorner/cellTitleCornerComponent';
import { Board } from '../../model/board';
import { Player } from '../../model/player';
import { useEffect } from 'react';

const columns = '01234567'.split('').map((e) => Number(e));
const rows = '76543210'.split('').map((e) => Number(e));

const columnsReverse = [...columns].reverse();
const rowsReverse = [...rows].reverse();

const indexToChar = (index) => {
	return String.fromCharCode(Number(index) + 65);
};

const BoardComponent = ({ board, onMove, activePlayer }) => {
	const [activeCell, setActiveCell] = useState(null);

	// const currentColumns = columns;
	// const currentRows = rows;

	const currentColumns = activePlayer.color === COLOR.BLACK ? columnsReverse : columns;
	const currentRows = activePlayer.color === COLOR.BLACK ? rowsReverse : rows;

	const handleCellClick = (targetCell) => {
		if (targetCell.piece?.color === activePlayer.color) {
			board.highlightMoves(targetCell);
			setActiveCell(targetCell);
		} else {
			if (activeCell && board.canMove(activeCell, targetCell)) {
				board.clearMovesHighlighting();
				board.move(activeCell, targetCell);
				onMove({ board });
				setActiveCell(targetCell);
			}
		}
	};

	// useEffect(() => {
	// 	console.log('useEffect active player', activePlayer);
	// }, [activePlayer]);

	useEffect(() => {
		console.log('useEffect onMove FUCK!!!');
	}, [onMove]);

	// useEffect(() => {
	// 	console.log('board changed');
	// }, [board]);

	const renderCellsTitle = useCallback(() => {
		return (
			<div className='board-row'>
				<CellTitleCornerComponent color={COLOR.BLACK} />
				{currentColumns.map((colNum) => {
					const charLabel = indexToChar(colNum);

					return (
						<CellTitleComponent
							key={charLabel}
							data={charLabel}
							orientation={TITLE_ORIENTATION.HORIZONTAL}
							color={COLOR.BLACK}
						/>
					);
				})}
				<CellTitleCornerComponent color={COLOR.BLACK} />
			</div>
		);
	});

	return (
		<div className={`board`}>
			{renderCellsTitle()}

			{currentRows.map((y) => {
				return (
					<div className='board-row' key={y}>
						<CellTitleComponent
							key={`${y}${0}`}
							data={y + 1}
							orientation={TITLE_ORIENTATION.VERTICAL}
							color={COLOR.BLACK}
						/>

						{currentColumns.map((x) => {
							const cell = board.getCell(x, y);
							return (
								<CellComponent
									key={cell.id}
									cell={cell}
									onClick={handleCellClick}
									isActive={activeCell?.x === cell.x && activeCell?.y === cell.y}
									isHighlighted={cell.isHighlighted}
								/>
							);
						})}

						<CellTitleComponent
							key={y}
							data={y + 1}
							orientation={TITLE_ORIENTATION.VERTICAL}
							color={COLOR.BLACK}
						/>
					</div>
				);
			})}

			{renderCellsTitle()}
		</div>
	);
};

BoardComponent.propTypes = {
	board: PropTypes.instanceOf(Board).isRequired,
	onMove: PropTypes.func.isRequired,
	activePlayer: PropTypes.instanceOf(Player).isRequired,
};

export default BoardComponent;
