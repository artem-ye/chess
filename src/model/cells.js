// import { Board } from './board';
import { Cell } from './cell';
import { COLOR } from './enums/color';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';

export class Cells {
	static createCells() {
		const cells = [];

		const getCellColor = (row, col) => {
			return (row + col) % 2 === 0 ? COLOR.BLACK : COLOR.WHITE;
		};

		for (let y = 0; y < 8; y++) {
			cells.push([]);

			for (let x = 0; x < 8; x++) {
				cells[y].push(new Cell(x, y, getCellColor(y, x)));
			}
		}

		return cells;
	}

	static alignChess(cells) {
		for (let x = 0; x < 8; x++) {
			cells[1][x].piece = new Pawn(COLOR.WHITE);
			cells[6][x].piece = new Pawn(COLOR.BLACK);
		}

		cells[0][0].piece = new Rook(COLOR.WHITE);
		cells[0][7].piece = new Rook(COLOR.WHITE);

		cells[7][0].piece = new Rook(COLOR.BLACK);
		cells[7][7].piece = new Rook(COLOR.BLACK);

		cells[0][1].piece = new Knight(COLOR.WHITE);
		cells[0][6].piece = new Knight(COLOR.WHITE);

		cells[7][1].piece = new Knight(COLOR.BLACK);
		cells[7][6].piece = new Knight(COLOR.BLACK);

		cells[0][2].piece = new Bishop(COLOR.WHITE);
		cells[0][5].piece = new Bishop(COLOR.WHITE);

		cells[7][2].piece = new Bishop(COLOR.BLACK);
		cells[7][5].piece = new Bishop(COLOR.BLACK);

		cells[0][3].piece = new Queen(COLOR.WHITE);
		cells[7][3].piece = new Queen(COLOR.BLACK);

		cells[0][4].piece = new King(COLOR.WHITE);
		cells[7][4].piece = new King(COLOR.BLACK);
	}

	static isEmpty(cell) {
		return !cell.piece;
	}

	static isVerticalFree(cells, sourceCell, targetCell) {
		if (!Cells.isVertical(sourceCell, targetCell)) {
			return false;
		}

		const start = Math.min(sourceCell.y, targetCell.y) + 1;
		const end = Math.max(sourceCell.y, targetCell.y);

		for (let y = start; y < end; y++) {
			if (!Cells.isEmpty(cells[y][sourceCell.x])) {
				return false;
			}
		}

		return true;
	}

	static isHorizontalFree(cells, sourceCell, targetCell) {
		if (sourceCell.y !== targetCell.y) {
			return false;
		}

		const start = Math.min(sourceCell.x, targetCell.x) + 1;
		const end = Math.max(sourceCell.x, targetCell.x);

		for (let x = start; x < end; x++) {
			if (!Cells.isEmpty(cells[sourceCell.y][x])) {
				return false;
			}
		}

		return true;
	}

	static isDiagonalFree(cells, sourceCell, targetCell) {
		if (!this.isDiagonal(sourceCell, targetCell)) {
			return false;
		}

		const absX = Math.abs(targetCell.x - sourceCell.x);
		const offsetX = sourceCell.x < targetCell.x ? 1 : -1;
		const offsetY = sourceCell.y < targetCell.y ? 1 : -1;

		for (let i = 1; i < absX; i++) {
			if (!Cells.isEmpty(cells[sourceCell.y + offsetY * i][sourceCell.x + offsetX * i])) {
				return false;
			}
		}

		return true;
	}

	static isDiagonal(sourceCell, targetCell) {
		const absX = Math.abs(targetCell.x - sourceCell.x);
		const absY = Math.abs(targetCell.y - sourceCell.y);

		return absX === absY;
	}

	static isVertical(sourceCell, targetCell) {
		return sourceCell.x === targetCell.x;
	}
}
