import { useState, useRef } from 'react';
import { COLOR } from '../model/enums/color';

const useTimer = (initialTime) => {
	const [blackTime, setBlackTime] = useState(initialTime);
	const [whiteTime, setWhiteTime] = useState(initialTime);
	const timerId = useRef(null);

	const stopTimer = () => {
		timerId.current && clearInterval(timerId.current);
		timerId.current = null;
	};

	const resetTimer = (initialTime) => {
		stopTimer();
		setBlackTime(initialTime);
		setWhiteTime(initialTime);
	};

	const startTimer = (player) => {
		const INTERVAL = 100;
		const setTime = player.color === COLOR.BLACK ? setBlackTime : setWhiteTime;

		if (timerId.current) {
			stopTimer();
		}

		timerId.current = setInterval(() => {
			setTime((prev) => {
				if (prev - INTERVAL <= 0) {
					stopTimer();
					return 0;
				}
				return prev - INTERVAL;
			});
		}, INTERVAL);
	};

	return {
		startTimer,
		stopTimer,
		resetTimer,
		blackTime,
		whiteTime,
	};
};

export default useTimer;
