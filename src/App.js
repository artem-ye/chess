import React, { useState } from 'react';
// import { useEffect } from 'react';
import { useCallback } from 'react';
import './App.css';
import BoardComponent from './components/board/boardComponent';
// import BoardLegendComponent from './components/boardLegend/boardLegendComponent';
// import useTimer from './hooks/useTimer';
import { Board } from './model/board';
import { COLOR } from './model/enums/color';
import { Player } from './model/player';

// const INIT_TIME = 1 * 60 * 1000;

function App() {
	const [board, setBoard] = useState(new Board());

	const BLACK_PLAYER = new Player('Black', COLOR.BLACK);
	const WHITE_PLAYER = new Player('White', COLOR.WHITE);
	const [currentPlayer, setCurrentPlayer] = useState(() => WHITE_PLAYER);

	// const { blackTime, whiteTime, startTimer } = useTimer(INIT_TIME);
	// const { blackTime, whiteTime } = useTimer(INIT_TIME);

	// useEffect(() => {
	// 	const nextPlayer = currentPlayer.color === COLOR.WHITE ? BLACK_PLAYER : WHITE_PLAYER;
	// 	startTimer(nextPlayer);
	// }, [currentPlayer]);

	const onMove = useCallback(() => {
		setTimeout(() => {
			setBoard(board.getBoardCopy());
			const nextPlayer = currentPlayer.color === COLOR.WHITE ? BLACK_PLAYER : WHITE_PLAYER;
			setCurrentPlayer(nextPlayer);
		}, 400);
	});

	return (
		<div className='App'>
			<div className='board-wrapper'>
				<BoardComponent board={board} onMove={onMove} activePlayer={currentPlayer} />
				{/* <BoardLegendComponent
					activePlayer={currentPlayer}
					whiteTime={whiteTime}
					blackTime={blackTime}
					board={board}
				/> */}
			</div>
		</div>
	);
}

export default App;
