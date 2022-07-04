import { Piece } from './piece';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';
import { COLOR } from '../enums/color';
import { Cells } from '../cells';

export class Pawn extends Piece {
	instanceOf = Pawn;
	type = PIECES_TYPES.PAWN;
	icon = faChessPawn;

	constructor(color) {
		super(color);
	}

	move(sourceCell, targetCell) {
		return super.move(sourceCell, targetCell);
	}

	canMove(cells, sourceCell, targetCell) {
		if (!super.canMove(cells, sourceCell, targetCell)) {
			return false;
		}

		return this.canAttack(cells, sourceCell, targetCell);
	}

	canAttack(cells, sourceCell, targetCell) {
		if (!super.canAttack()) {
			return false;
		}

		const dY = targetCell.y - sourceCell.y;

		if ((dY < 0 && this.color === COLOR.WHITE) || (dY > 0 && this.color === COLOR.BLACK)) {
			// move back
			return false;
		}

		if (Cells.isDiagonal(sourceCell, targetCell)) {
			const dY = Math.abs(sourceCell.y - targetCell.y);
			return dY === 1 && this.isEnemy(targetCell.piece);
		}

		if (!Cells.isVertical(sourceCell, targetCell)) {
			return false;
		}

		if (!Cells.isEmpty(targetCell)) {
			return false;
		}

		const absDeltaY = Math.abs(dY);

		if (absDeltaY === 1 || (absDeltaY === 2 && this.isFirstMove)) {
			return true;
		}

		return false;
	}
}
