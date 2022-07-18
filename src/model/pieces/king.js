import { Piece } from './base/piece';
import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
import { COLOR } from '../enums/color';

export class King extends Piece {
	instanceOf = King;
	type = PIECES_TYPES.KING;
	icon = faChessKing;

	move(target) {
		if (this.canCastling(target)) {
			const source = this.getSquare();
			const isShortCastling = target.x > source.x;

			const rook = this.board.getSquare(isShortCastling ? 7 : 0, target.y).piece;
			this.squares.movePiece(rook, isShortCastling ? 5 : 3, target.y);
		}

		super.move(target);
	}

	canMove(target) {
		if (this.canCastling(target)) {
			return true;
		}

		return super.canMove(target);
	}

	canAttack(target) {
		if (target.getPieceType() === PIECES_TYPES.KING) {
			return false;
		}

		if (!super.canAttack(target)) {
			return false;
		}

		const source = this.getSquare();

		if (this.getVerticalMoveLength(source, target) === 1) {
			return true;
		}

		if (this.getDiagonalMoveLength(source, target) === 1) {
			return true;
		}

		if (this.getHorizontalMoveLength(source, target) === 1) {
			return true;
		}

		return false;
	}

	isFriendlyKing(color) {
		return this.color === color;
	}

	canCastling(target) {
		if (!this.isFirstMove) {
			return false;
		}

		const source = this.getSquare();

		const MOVE_LENGTH = this.getHorizontalMoveLength(source, target);
		if (MOVE_LENGTH !== 2) {
			return false;
		}

		const KINGS_X_POSITION = source.x;
		const KINGS_Y_POSITION = source.y;
		const getKingsHorizontalSquare = (x) => this.board.getSquare(x, KINGS_Y_POSITION);

		// Rook stays on its initial position
		const rookSquare = getKingsHorizontalSquare(target.x > KINGS_X_POSITION ? 7 : 0);
		if (
			rookSquare.getPieceType() !== PIECES_TYPES.ROOK ||
			this.isEnemy(rookSquare.piece) ||
			!rookSquare.piece.isFirstMove
		) {
			return false;
		}

		if (!this.isHorizontalFree(source, target)) {
			return false;
		}

		if (this.isInCheck()) {
			return false;
		}

		// The king does not pass through a square that is attacked by an opposing piece
		const opposingPieces = this.#getOpposingPieces();
		const offsetDirection = rookSquare.y > KINGS_Y_POSITION ? 1 : -1;

		for (let offset = 1; offset < MOVE_LENGTH; offset++) {
			const x = KINGS_X_POSITION + offset * offsetDirection;
			const passSquare = getKingsHorizontalSquare(x);

			if (opposingPieces.find((enemy) => enemy.canAttack(passSquare))) {
				return false;
			}
		}

		return true;
	}

	isInCheck() {
		const kingsColor = this.color;
		const kingsSquare = this.getSquare();

		const opponentPieces = this.squares
			.getSquaresByPieceColor(kingsColor === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE)
			.map((square) => square.piece);

		for (let i = 0; i < opponentPieces.length; i++) {
			if (opponentPieces[i].canAttack(kingsSquare)) {
				return true;
			}
		}

		return false;
	}

	#getOpposingPieces() {
		const OPPONENT_COLOR = this.color === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;
		return this.squares.getSquaresByPieceColor(OPPONENT_COLOR).map((square) => square.piece);
	}
}
