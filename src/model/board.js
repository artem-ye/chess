import { Cells } from './cells';
import { COLOR } from './enums/color';

export class Board {
	#cells = [];

	#capturedPieces = {
		[COLOR.WHITE]: [],
		[COLOR.BLACK]: [],
	};

	enPassant = [];

	constructor(cells = null) {
		if (!cells) {
			this.#init();
		} else {
			this.#cells = cells;
		}
	}

	getCapturedPieces(color) {
		const figures = this.#capturedPieces[color];
		return figures;
	}

	getCell(x, y) {
		return this.#cells[y][x];
	}

	canMove(source, target) {
		const sourceCell = this.getCell(source.x, source.y);
		const targetCell = this.getCell(target.x, target.y);

		if (sourceCell.isEmpty()) {
			return false;
		}

		if (!sourceCell.piece.canMove(this.#cells, sourceCell, targetCell)) {
			return false;
		}

		return this.#isCheckTreatFreeMove(sourceCell, targetCell);
	}

	move(source, target) {
		const sourceCell = this.getCell(source.x, source.y);
		const targetCell = this.getCell(target.x, target.y);

		const capturedPiece = sourceCell.piece.move(sourceCell, targetCell);

		if (capturedPiece) {
			this.#capturedPieces[capturedPiece.color].push(capturedPiece);
		}
	}

	highlightMoves(sourceCell) {
		this.#cells.forEach((row) => {
			row.forEach((targetCell) => {
				targetCell.isHighlighted = sourceCell?.piece ? this.canMove(sourceCell, targetCell) : false;
			});
		});
	}

	clearMovesHighlighting() {
		this.#cells.forEach((row) => {
			row.forEach((targetCell) => {
				targetCell.isHighlighted = false;
			});
		});
	}

	getBoardCopy() {
		const boardCopy = new Board(this.#cells);
		boardCopy.#capturedPieces = { ...this.#capturedPieces };
		return boardCopy;
	}

	#init() {
		this.#cells = Cells.createCells();
		Cells.alignChess(this.#cells);
	}

	// ************************************************************************
	// Game logic
	get cells() {
		return this.#cells;
	}

	#isCheckTreatFreeMove(sourceCell, targetCell) {
		if (!sourceCell || !targetCell) {
			throw new Error('isCheckTreatFreeMove parameters mismatch');
		}

		const clonedCells = this.#cloneCells();
		const boardClone = new Board(clonedCells);

		const moveColor = sourceCell.piece.color;
		boardClone.move(sourceCell, targetCell);
		return !boardClone.#isKingUnderCheck(moveColor);
	}

	#isKingUnderCheck(kingColor) {
		const { kingCell, enemyPiecesCells } = this.#cells.reduce(
			(acc, rows) => {
				rows.forEach((cell) => {
					const piece = cell.piece;

					if (!piece) {
						return;
					}

					if (piece.isFriendlyKing(kingColor)) {
						acc.kingCell = cell;
					} else {
						if (piece.color !== kingColor) {
							acc.enemyPiecesCells.push(cell);
						}
					}
				});

				return acc;
			},
			{ kingCell: null, enemyPiecesCells: [] }
		);

		let isKingUnderAttack = false;

		for (let i = 0; i < enemyPiecesCells.length; i++) {
			if (enemyPiecesCells[i].piece.canAttack(this.#cells, enemyPiecesCells[i], kingCell)) {
				isKingUnderAttack = true;
				break;
			}
		}

		return isKingUnderAttack;
	}

	#cloneCells() {
		const clone = [];

		this.#cells.forEach((row, rowNum) => {
			clone.push([]);

			row.forEach((cell) => {
				clone[rowNum].push(cell.clone());
			});
		});

		return clone;
	}
}
