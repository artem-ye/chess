import { Piece } from './base/piece';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
// import { Cells } from '../cells';

export class Rook extends Piece {
	instanceOf = Rook;
	type = PIECES_TYPES.ROOK;
	icon = faChessRook;

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

		return false;
	}
}
