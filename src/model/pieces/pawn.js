import { Piece } from './base/piece';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
import { COLOR } from '../enums/color';

export class Pawn extends Piece {
	instanceOf = Pawn;
	type = PIECES_TYPES.PAWN;
	icon = faChessPawn;

	move(target) {
		const source = this.getSquare();
		let enPassantAbilities = null;

		if (this.#isFirstLongMove(source, target)) {
			enPassantAbilities = this.#getEnPassantNeighbors(target).map((attackerSquare) => {
				return {
					captureXY: { x: target.x, y: target.y },
					sourceXY: { x: attackerSquare.x, y: attackerSquare.y },
					targetXY: { x: target.x, y: this.color === COLOR.WHITE ? target.y - 1 : target.y + 1 },
				};
			});
			enPassantAbilities = enPassantAbilities.length === 0 ? null : enPassantAbilities;
		} else {
			const enPassantMove = this.isEnPassantMove(source, target);
			if (enPassantMove) {
				// en passant piece capture
				const capturedPiece = this.board.getSquare(enPassantMove.captureXY.x, enPassantMove.captureXY.y).piece;
				this.squares.capture(capturedPiece);
			}
		}

		super.move(target);
		this.board.enPassantAbilities = enPassantAbilities;
	}

	canMove(target) {
		if (target.getPieceType() === PIECES_TYPES.KING) {
			return false;
		}

		if (this.isEnPassantMove(this.getSquare(), target)) {
			return true;
		}

		return this.canAttack(target);
	}

	canAttack(target) {
		if (!super.canAttack(target)) {
			return false;
		}

		const source = this.getSquare();

		if (!this.isMoveForward(source, target)) {
			return false;
		}

		const diagonalMoveLength = this.getDiagonalMoveLength(source, target);
		if (diagonalMoveLength > 0) {
			return diagonalMoveLength === 1 && this.isEnemy(target.piece);
		}

		if (!target.isEmpty()) {
			return false;
		}

		const verticalMoveLength = this.getVerticalMoveLength(source, target);
		return verticalMoveLength === 1 || (verticalMoveLength === 2 && this.isFirstMove);
	}

	#isFirstLongMove(source, target) {
		return (
			this.isFirstMove && this.isMoveForward(source, target) && this.getVerticalMoveLength(source, target) === 2
		);
	}

	#isEnemyPawn(square) {
		return square.getPieceType() === PIECES_TYPES.PAWN && this.color !== square.getPieceColor();
	}

	#getEnPassantNeighbors(square) {
		return [square.x - 1, square.x + 1].reduce((acc, x) => {
			if (x >= 0 && x <= 7) {
				const neighborSquare = this.board.getSquare(x, square.y);
				if (this.#isEnemyPawn(neighborSquare)) {
					return [...acc, neighborSquare];
				}
			}
			return acc;
		}, []);
	}

	isEnPassantMove(source, target) {
		return this.board.enPassantAbilities?.find(
			(entry) =>
				entry.sourceXY.x === source.x &&
				entry.sourceXY.y === source.y &&
				entry.targetXY.x === target.x &&
				entry.targetXY.y === target.y
		);
	}
}
