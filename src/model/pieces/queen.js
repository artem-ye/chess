import { Piece } from './base/piece';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';

export class Queen extends Piece {
	instanceOf = Queen;
	type = PIECES_TYPES.QUEEN;
	icon = faChessQueen;

	canMove(target) {
		if (!super.canMove(target)) {
			return false;
		}

		return this.canAttack(target);
	}

	canAttack(target) {
		if (!super.canAttack(target)) {
			return false;
		}

		const source = this.getSquare();

		if (this.isVerticalFree(source, target)) {
			return true;
		}

		if (this.isHorizontalFree(source, target)) {
			return true;
		}

		if (this.isDiagonalFree(source, target)) {
			return true;
		}

		return false;
	}
}
