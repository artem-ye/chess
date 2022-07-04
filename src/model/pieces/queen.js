import { Piece } from './piece';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
import { Cells } from '../cells';

export class Queen extends Piece {
	instanceOf = Queen;
	type = PIECES_TYPES.QUEEN;
	icon = faChessQueen;

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

		if (Cells.isVerticalFree(cells, sourceCell, targetCell)) {
			return true;
		}

		if (Cells.isHorizontalFree(cells, sourceCell, targetCell)) {
			return true;
		}

		if (Cells.isDiagonalFree(cells, sourceCell, targetCell)) {
			return true;
		}

		return false;
	}
}
