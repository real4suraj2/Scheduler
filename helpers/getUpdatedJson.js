const getStatus = (status, timestamp) => {
	const d = new Date().getTime();
	if (status == "nonWorkingHrs") return status;
	else if (status == "timeout") return status;
	return d + 5.5 * 3600 * 1000 - timestamp > 0 ? "timeout" : status;
};

export default (json) => {
	return {
		"00:00-01:00": {
			timestamp: json["00:00-01:00"].timestamp,
			status: getStatus(
				json["00:00-01:00"].status,
				json["00:00-01:00"].timestamp
			),
		},
		"01:00-02:00": {
			timestamp: json["01:00-02:00"].timestamp,
			status: getStatus(
				json["01:00-02:00"].status,
				json["01:00-02:00"].timestamp
			),
		},
		"02:00-03:00": {
			timestamp: json["02:00-03:00"].timestamp,
			status: getStatus(
				json["02:00-03:00"].status,
				json["02:00-03:00"].timestamp
			),
		},
		"03:00-04:00": {
			timestamp: json["03:00-04:00"].timestamp,
			status: getStatus(
				json["03:00-04:00"].status,
				json["03:00-04:00"].timestamp
			),
		},
		"04:00-05:00": {
			timestamp: json["04:00-05:00"].timestamp,
			status: getStatus(
				json["04:00-05:00"].status,
				json["04:00-05:00"].timestamp
			),
		},
		"05:00-06:00": {
			timestamp: json["05:00-06:00"].timestamp,
			status: getStatus(
				json["05:00-06:00"].status,
				json["05:00-06:00"].timestamp
			),
		},
		"06:00-07:00": {
			timestamp: json["06:00-07:00"].timestamp,
			status: getStatus(
				json["06:00-07:00"].status,
				json["06:00-07:00"].timestamp
			),
		},
		"07:00-08:00": {
			timestamp: json["07:00-08:00"].timestamp,
			status: getStatus(
				json["07:00-08:00"].status,
				json["07:00-08:00"].timestamp
			),
		},
		"08:00-09:00": {
			timestamp: json["08:00-09:00"].timestamp,
			status: getStatus(
				json["08:00-09:00"].status,
				json["08:00-09:00"].timestamp
			),
		},
		"09:00-10:00": {
			timestamp: json["09:00-10:00"].timestamp,
			status: getStatus(
				json["09:00-10:00"].status,
				json["09:00-10:00"].timestamp
			),
		},
		"10:00-11:00": {
			timestamp: json["10:00-11:00"].timestamp,
			status: getStatus(
				json["10:00-11:00"].status,
				json["10:00-11:00"].timestamp
			),
		},
		"11:00-12:00": {
			timestamp: json["11:00-12:00"].timestamp,
			status: getStatus(
				json["11:00-12:00"].status,
				json["11:00-12:00"].timestamp
			),
		},
		"12:00-13:00": {
			timestamp: json["12:00-13:00"].timestamp,
			status: getStatus(
				json["12:00-13:00"].status,
				json["12:00-13:00"].timestamp
			),
		},
		"13:00-14:00": {
			timestamp: json["13:00-14:00"].timestamp,
			status: getStatus(
				json["13:00-14:00"].status,
				json["13:00-14:00"].timestamp
			),
		},
		"14:00-15:00": {
			timestamp: json["14:00-15:00"].timestamp,
			status: getStatus(
				json["14:00-15:00"].status,
				json["14:00-15:00"].timestamp
			),
		},
		"15:00-16:00": {
			timestamp: json["15:00-16:00"].timestamp,
			status: getStatus(
				json["15:00-16:00"].status,
				json["15:00-16:00"].timestamp
			),
		},
		"16:00-17:00": {
			timestamp: json["16:00-17:00"].timestamp,
			status: getStatus(
				json["16:00-17:00"].status,
				json["16:00-17:00"].timestamp
			),
		},
		"17:00-18:00": {
			timestamp: json["17:00-18:00"].timestamp,
			status: getStatus(
				json["17:00-18:00"].status,
				json["17:00-18:00"].timestamp
			),
		},
		"18:00-19:00": {
			timestamp: json["18:00-19:00"].timestamp,
			status: getStatus(
				json["18:00-19:00"].status,
				json["18:00-19:00"].timestamp
			),
		},
		"19:00-20:00": {
			timestamp: json["19:00-20:00"].timestamp,
			status: getStatus(
				json["19:00-20:00"].status,
				json["19:00-20:00"].timestamp
			),
		},
		"20:00-21:00": {
			timestamp: json["20:00-21:00"].timestamp,
			status: getStatus(
				json["20:00-21:00"].status,
				json["20:00-21:00"].timestamp
			),
		},
		"21:00-22:00": {
			timestamp: json["21:00-22:00"].timestamp,
			status: getStatus(
				json["21:00-22:00"].status,
				json["21:00-22:00"].timestamp
			),
		},
		"22:00-23:00": {
			timestamp: json["22:00-23:00"].timestamp,
			status: getStatus(
				json["22:00-23:00"].status,
				json["22:00-23:00"].timestamp
			),
		},
		"23:00-00:00": {
			timestamp: json["23:00-00:00"].timestamp,
			status: getStatus(
				json["23:00-00:00"].status,
				json["23:00-00:00"].timestamp
			),
		},
	};
};
