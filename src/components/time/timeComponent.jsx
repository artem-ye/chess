import React from 'react';
import PropTypes from 'prop-types';

const parseTime = (time) => {
	let minutes = 0;
	let seconds = 0;
	let msec = 0;

	let tmpTime = time;

	minutes = Math.floor(tmpTime / (60 * 1000));
	tmpTime -= 60 * 1000 * minutes;
	seconds = Math.floor(tmpTime / 1000);
	tmpTime -= 1000 * seconds;
	msec = tmpTime / 100;

	return {
		minutes,
		seconds,
		msec,
	};
};

const TimeComponent = ({ time }) => {
	const { minutes, seconds, msec } = parseTime(time);

	return (
		<>
			{minutes}:{seconds < 10 ? '0' : ''}
			{seconds}
			{minutes === 0 && `:${msec}`}
		</>
	);
};

TimeComponent.propTypes = {
	time: PropTypes.number,
};

export default TimeComponent;
