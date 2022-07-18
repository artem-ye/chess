import { ChessBoard } from './chessBoard';

export class Board {
	chessBoard;

	constructor() {
		this.chessBoard = new ChessBoard();
		this.chessBoard.init();
	}

	getCell(x, y) {
		return this.chessBoard.getSquare(x, y);
	}

	canMove(source, target) {
		return this.chessBoard.canMove(source, target);
	}

	move(source, target) {
		this.chessBoard.move(source, target);
	}

	highlightMoves(source) {
		this.chessBoard.highlightMoves(source);
	}

	clearMovesHighlighting() {
		this.chessBoard.clearMovesHighlighting();
	}

	getCapturedPieces(color) {
		return this.chessBoard.getCapturedPieces().filter((piece) => piece.color === color);
	}

	getBoardCopy() {
		const boardCopy = new Board();
		boardCopy.chessBoard = this.chessBoard;
		return boardCopy;
	}
}
