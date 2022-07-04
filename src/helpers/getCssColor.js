import { COLOR } from '../model/enums/color';

export function getCssColor(color) {
	if (color === COLOR.BLACK) {
		return 'black';
	}

	return 'white';
}
