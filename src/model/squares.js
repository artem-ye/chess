import { Square } from './square';
import { COLOR } from './enums/color';

class PiecesSquares {
	constructor() {
		this.piecesSquares = {
			[COLOR.BLACK]: {},
			[COLOR.WHITE]: {},
		};
	}

	get(piece) {
		return this.piecesSquares[piece.color][piece.id];
	}

	getByColor(color) {
		return Object.values(this.piecesSquares[color]);
	}

	set(piece, square) {
		this.piecesSquares[piece.color][piece.id] = square;
	}

	delete(piece) {
		delete this.piecesSquares[piece.color][piece.id];
	}
}

export class Squares {
	#piecesSquares;

	constructor() {
		this.squares = [];
		this.#piecesSquares = new PiecesSquares();
		this.capturedPieces = [];
		this.#createSquares();
	}

	clone(newBoard) {
		const squaresClone = new Squares();

		this.getPieces().forEach((piece) => {
			const square = piece.getSquare();
			squaresClone.setPiece(piece.clone(newBoard), square.x, square.y);
		});

		return squaresClone;
	}

	getSquare(x, y) {
		return this.squares[y][x];
	}

	getSquares() {
		return this.squares.flat();
	}

	getSquaresByPieceColor(color) {
		return this.#piecesSquares.getByColor(color);
	}

	getPieces() {
		const blackPiecesSquares = this.#piecesSquares.getByColor(COLOR.BLACK);
		const whitePiecesSquares = this.#piecesSquares.getByColor(COLOR.WHITE);
		return [...blackPiecesSquares, ...whitePiecesSquares].map((square) => square.piece);
	}

	setPiece(piece, x, y) {
		const square = this.getSquare(x, y);
		square.piece = piece;
		this.#piecesSquares.set(piece, square);
	}

	getPieceSquare(piece) {
		return this.#piecesSquares.get(piece);
	}

	removePiece(piece) {
		const square = this.getPieceSquare(piece);
		square.clear();
		this.#piecesSquares.delete(piece);
	}

	movePiece(piece, x, y) {
		this.removePiece(piece);
		this.setPiece(piece, x, y);
	}

	capture(piece) {
		this.capturedPieces.push(piece);
		this.removePiece(piece);
	}

	#createSquares() {
		const squares = this.squares;

		const getColor = (row, col) => {
			return (row + col) % 2 === 0 ? COLOR.BLACK : COLOR.WHITE;
		};

		for (let y = 0; y < 8; y++) {
			squares.push([]);

			for (let x = 0; x < 8; x++) {
				squares[y].push(new Square(x, y, getColor(y, x)));
			}
		}
	}
}
