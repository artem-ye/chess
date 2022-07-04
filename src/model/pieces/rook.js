import { Piece } from './piece';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
import { Cells } from '../cells';

export class Rook extends Piece {
	instanceOf = Rook;
	type = PIECES_TYPES.ROOK;
	icon = faChessRook;

	canMove(cells, sourceCell, targetCell) {
		if (!super.canMove(cells, sourceCell, targetCell)) {
			return false;
		}

		return this.canMove(cells, sourceCell, targetCell);
	}

	canAttack(cells, sourceCell, targetCell) {
		// console.log('ROOK', sourceCell, targetCell);

		if (!super.canAttack(cells, sourceCell, targetCell)) {
			return false;
		}

		if (Cells.isVerticalFree(cells, sourceCell, targetCell)) {
			return true;
		}

		if (Cells.isHorizontalFree(cells, sourceCell, targetCell)) {
			return true;
		}

		return false;
	}
}
