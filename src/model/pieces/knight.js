import { Piece } from './base/piece';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';

export class Knight extends Piece {
	instanceOf = Knight;
	type = PIECES_TYPES.KNIGHT;
	icon = faChessKnight;

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

		return this.isKnightMove(this.getSquare(), target);
	}
}
