import { COLOR } from '../../enums/color';
import { PIECES_TYPES } from '../../enums/piecesTypes';

export class Piece {
	instanceOf = Piece;
	icon = null;
	type = null;

	constructor(color, board) {
		this.color = color;
		this.isFirstMove = true;
		this.board = board;
		this.id = Math.random();
	}

	clone(newBoard) {
		const clone = new this.instanceOf(this.color, newBoard);
		clone.isFirstMove = this.isFirstMove;
		return clone;
	}

	getSquare() {
		return this.#getPieceSquare();
	}

	canMove(target) {
		if (target.getPieceType() === PIECES_TYPES.KING) {
			return false;
		}

		return this.canAttack(target);
	}

	canAttack(target) {
		if (target.getPieceColor() === this.color) {
			return false;
		}

		return true;
	}

	move(target) {
		if (!target.isEmpty()) {
			this.#capturePiece(target.piece);
		}

		this.isFirstMove = false;
		this.#movePiece(this, target.x, target.y);
		this.board.enPassantAbilities = null;
	}

	// -------------------------------------------------------------------
	// Movement
	// -------------------------------------------------------------------

	isEnemy(piece) {
		return !piece ? false : piece.color !== this.color;
	}

	isFriendlyKing(color) {
		if (!color) {
			throw new Error('isFriendlyKing coning params mismatch');
		}

		return false;
	}

	isMoveForward(source, target) {
		const dY = target.y - source.y;
		const pieceColor = this.color;
		return (pieceColor === COLOR.WHITE && dY > 0) || (pieceColor === COLOR.BLACK && dY < 0);
	}

	isVerticalMove(source, target) {
		return source.x === target.x;
	}

	isHorizontalMove(source, target) {
		return source.y === target.y;
	}

	isDiagonalMove(source, target) {
		return Math.abs(target.x - source.x) === Math.abs(target.y - source.y);
	}

	getVerticalMoveLength(source, target) {
		if (!this.isVerticalMove(source, target)) {
			return 0;
		}
		return Math.abs(source.y - target.y);
	}

	getHorizontalMoveLength(source, target) {
		if (!this.isHorizontalMove(source, target)) {
			return 0;
		}
		return Math.abs(source.x - target.x);
	}

	getDiagonalMoveLength(source, target) {
		if (!this.isDiagonalMove(source, target)) {
			return 0;
		}
		return Math.abs(source.y - target.y);
	}

	isVerticalFree(source, target) {
		if (!this.isVerticalMove(source, target)) {
			return false;
		}

		const start = Math.min(source.y, target.y) + 1;
		const end = Math.max(source.y, target.y);

		for (let y = start; y < end; y++) {
			if (!this.#getSquare(source.x, y).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	isHorizontalFree(source, target) {
		if (source.y !== target.y) {
			return false;
		}

		const start = Math.min(source.x, target.x) + 1;
		const end = Math.max(source.x, target.x);

		for (let x = start; x < end; x++) {
			if (!this.#getSquare(x, source.y).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	isDiagonalFree(source, target) {
		if (!this.isDiagonalMove(source, target)) {
			return false;
		}

		const absX = Math.abs(target.x - source.x);
		const offsetX = source.x < target.x ? 1 : -1;
		const offsetY = source.y < target.y ? 1 : -1;

		for (let i = 1; i < absX; i++) {
			if (!this.#getSquare(source.x + offsetX * i, source.y + offsetY * i).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	isKnightMove(source, target) {
		const dX = Math.abs(source.x - target.x);
		const dY = Math.abs(source.y - target.y);

		return (dX === 1 && dY === 2) || (dX === 2 && dY === 1);
	}

	// -------------------------------------------------------------------
	// Board squares aliases
	// -------------------------------------------------------------------

	get squares() {
		return this.board.squares;
	}

	#getPieceSquare() {
		return this.squares.getPieceSquare(this);
	}

	#capturePiece(piece) {
		this.squares.capture(piece);
	}

	#movePiece(piece, x, y) {
		this.squares.movePiece(piece, x, y);
	}

	#getSquare(x, y) {
		return this.squares.getSquare(x, y);
	}
}
