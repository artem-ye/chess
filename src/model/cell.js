export class Cell {
	#x;
	#y;
	#color;
	#id;
	piece = null;
	isHighlighted = false;

	constructor(x, y, color) {
		this.#x = x;
		this.#y = y;
		this.#color = color;
		this.#id = Math.random();
	}

	clone() {
		const newCell = new Cell(this.x, this.y, this.#color);
		newCell.#id = this.#id;
		if (this.piece) {
			newCell.piece = this.piece.clone();
		}

		newCell.isHighlighted = this.isHighlighted;
		return newCell;
	}

	isEmpty() {
		return this.piece ? false : true;
	}

	get color() {
		return this.#color;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	get id() {
		return this.#id;
	}
}
