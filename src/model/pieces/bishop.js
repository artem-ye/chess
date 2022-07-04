import { Piece } from './piece';
import { faChessBishop } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
import { Cells } from '../cells';

export class Bishop extends Piece {
	instanceOf = Bishop;
	type = PIECES_TYPES.BISHOP;
	icon = faChessBishop;

	canMove(cells, sourceCell, targetCell) {
		if (!super.canMove(cells, sourceCell, targetCell)) {
			return false;
		}

		return this.canAttack(cells, sourceCell, targetCell);
	}

	canAttack(cells, sourceCell, targetCell) {
		if (!super.canAttack(cells, sourceCell, targetCell)) {
			return false;
		}

		if (Cells.isDiagonalFree(cells, sourceCell, targetCell)) {
			return true;
		}

		return false;
	}
}
