import { Piece } from './base/piece';
import { faChessBishop } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
// import { Cells } from '../cells';

export class Bishop extends Piece {
	instanceOf = Bishop;
	type = PIECES_TYPES.BISHOP;
	icon = faChessBishop;

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

		if (this.isDiagonalFree(this.getSquare(), target)) {
			return true;
		}

		return false;
	}
}
