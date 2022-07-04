import { Piece } from './piece';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { PIECES_TYPES } from '../enums/piecesTypes';

export class Knight extends Piece {
	instanceOf = Knight;
	type = PIECES_TYPES.KNIGHT;
	icon = faChessKnight;

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

		const dX = Math.abs(sourceCell.x - targetCell.x);
		const dY = Math.abs(sourceCell.y - targetCell.y);

		return (dX === 1 && dY === 2) || (dX === 2 && dY === 1);
	}
}
