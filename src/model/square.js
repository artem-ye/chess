export class Square {
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

	clone(board) {
		const clone = new Square(this.x, this.y, this.#color);
		clone.#id = this.#id;
		if (this.piece) {
			clone.piece = this.piece.clone(board);
		}

		clone.isHighlighted = this.isHighlighted;
		return clone;
	}

	isEmpty() {
		return this.piece ? false : true;
	}

	clear() {
		this.piece = null;
	}

	getPieceType() {
		return this.piece?.type || null;
	}

	getPieceColor() {
		return this.piece?.color || null;
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
