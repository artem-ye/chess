import { Piece } from './piece';
import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
import { Cells } from '../cells';

export class King extends Piece {
	instanceOf = King;
	type = PIECES_TYPES.KING;
	icon = faChessKing;

	canMove(cells, sourceCell, targetCell) {
		if (!super.canMove(cells, sourceCell, targetCell)) {
			return false;
		}

		return this.canAttack(cells, sourceCell, targetCell);
	}

	canAttack(cells, sourceCell, targetCell) {
		if (targetCell?.piece?.type === PIECES_TYPES.KING) {
			return false;
		}

		if (!super.canAttack(cells, sourceCell, targetCell)) {
			return false;
		}

		const absX = Math.abs(sourceCell.x - targetCell.x);
		const absY = Math.abs(sourceCell.y - targetCell.y);

		if (
			(absY === 1 && Cells.isVerticalFree(cells, sourceCell, targetCell)) ||
			(absX === 1 && Cells.isHorizontalFree(cells, sourceCell, targetCell)) ||
			(absX === 1 && absY === 1 && Cells.isDiagonalFree(cells, sourceCell, targetCell))
		) {
			return true;
		}

		return false;
	}

	isFriendlyKing(color) {
		return this.color === color;
	}
}
