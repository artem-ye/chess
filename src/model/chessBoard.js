import { Squares } from './squares';

import { Pawn } from './pieces/pawn';
import { Rook } from './pieces/rook';
import { Knight } from './pieces/knight';
import { Bishop } from './pieces/bishop';
import { Queen } from './pieces/queen';
import { King } from './pieces/king';
import { COLOR } from './enums/color';

export class ChessBoard {
	constructor() {
		this.squares = new Squares();
		// En passant capture / взятие на проходе
		// https://en.wikipedia.org/wiki/En_passant
		this.enPassantAbilities = null;
	}

	init() {
		this.#setChess();
	}

	clone() {
		const boardClone = new ChessBoard();
		boardClone.squares = this.squares.clone(boardClone);
		boardClone.enPassantAbilities = this.enPassantAbilities ? [...this.enPassantAbilities] : null;
		return boardClone;
	}

	// -------------------------------------------------------------------
	// Public interface
	// -------------------------------------------------------------------

	getSquare(...params) {
		return this.squares.getSquare(...params);
	}

	getCapturedPieces() {
		return this.squares.capturedPieces;
	}

	highlightMoves(source) {
		const sourceCell = this.getSquare(source.x, source.y);
		if (sourceCell.isEmpty()) {
			this.clearMovesHighlighting();
			return;
		}

		this.#getSquares().forEach((target) => {
			target.isHighlighted = this.canMove(source, target);
		});
	}

	clearMovesHighlighting() {
		this.#getSquares().forEach((target) => {
			target.isHighlighted = false;
		});
	}

	canMove(source, target) {
		if (source.isEmpty()) {
			return false;
		}

		if (!source.piece.canMove(target)) {
			return false;
		}

		return this.#isCheckTreatFreeMove(source, target);
	}

	move(source, target) {
		source.piece.move(target);
	}

	isKingInCheck(kingsColor) {
		const kingsSquare = this.squares
			.getSquaresByPieceColor(kingsColor)
			.find((square) => square.piece.isFriendlyKing(kingsColor));

		return kingsSquare.piece.isInCheck();
	}

	#setChess() {
		for (let x = 0; x < 8; x++) {
			this.#setPiece(new Pawn(COLOR.WHITE, this), x, 1);
			this.#setPiece(new Pawn(COLOR.BLACK, this), x, 6);
		}

		this.#setPiece(new Rook(COLOR.WHITE, this), 0, 0);
		this.#setPiece(new Rook(COLOR.WHITE, this), 7, 0);
		this.#setPiece(new Rook(COLOR.BLACK, this), 0, 7);
		this.#setPiece(new Rook(COLOR.BLACK, this), 7, 7);

		this.#setPiece(new Knight(COLOR.WHITE, this), 1, 0);
		this.#setPiece(new Knight(COLOR.WHITE, this), 6, 0);
		this.#setPiece(new Knight(COLOR.BLACK, this), 1, 7);
		this.#setPiece(new Knight(COLOR.BLACK, this), 6, 7);

		this.#setPiece(new Bishop(COLOR.WHITE, this), 2, 0);
		this.#setPiece(new Bishop(COLOR.WHITE, this), 5, 0);
		this.#setPiece(new Bishop(COLOR.BLACK, this), 2, 7);
		this.#setPiece(new Bishop(COLOR.BLACK, this), 5, 7);

		this.#setPiece(new Queen(COLOR.WHITE, this), 3, 0);
		this.#setPiece(new Queen(COLOR.BLACK, this), 3, 7);

		this.#setPiece(new King(COLOR.WHITE, this), 4, 0);
		this.#setPiece(new King(COLOR.BLACK, this), 4, 7);
	}

	#isCheckTreatFreeMove(source, target) {
		const boardClone = this.clone();
		const PLAYER_COLOR = source.piece.color;

		// re-reference source and target to board clone
		boardClone.move(boardClone.getSquare(source.x, source.y), boardClone.getSquare(target.x, target.y));
		return !boardClone.isKingInCheck(PLAYER_COLOR);
	}

	// -------------------------------------------------------------------
	// Board squares aliases
	// -------------------------------------------------------------------

	#setPiece(...params) {
		this.squares.setPiece(...params);
	}

	#getSquares() {
		return this.squares.getSquares();
	}
}
