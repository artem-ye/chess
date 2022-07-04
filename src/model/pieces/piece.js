import { PIECES_TYPES } from '../enums/piecesTypes';

export class Piece {
	instanceOf = Piece;
	icon = null;
	type = null;

	color;
	isFirstMove = true;

	constructor(color) {
		this.color = color;
		this.id = Math.random();

		if (this.icon) {
			console.log('Fuck!!! WORKS', this.icon);
		}
	}

	clone() {
		const clone = new this.instanceOf(this.color);
		clone.isFirstMove = this.isFirstMove;
		return clone;
	}

	canMove(cells, sourceCell, targetCell) {
		if (targetCell.piece && targetCell.piece.type === PIECES_TYPES.KING) {
			return false;
		}

		return this.canAttack(cells, sourceCell, targetCell);
	}

	canAttack(cells, sourceCell, targetCell) {
		if (cells && sourceCell && targetCell) {
			if (targetCell?.piece?.color === this.color) {
				return false;
			}
		}

		return true;
	}

	move(sourceCell, targetCell) {
		const capturedPiece = targetCell.piece;

		targetCell.piece = sourceCell.piece;
		sourceCell.piece = null;
		this.isFirstMove = false;

		return capturedPiece || null;
	}

	isEnemy(piece) {
		return !piece ? false : piece.color !== this.color;
	}

	isFriendlyKing(color) {
		if (!color) {
			throw new Error('isFriendly coning params mismatch');
		}
	}
}
