import getStartingTimeStamp from "./getStartingTimeStamp";

const TIMESTAMPS = [
	"Select",
	"00:00",
	"01:00",
	"02:00",
	"03:00",
	"04:00",
	"05:00",
	"06:00",
	"07:00",
	"08:00",
	"09:00",
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
	"17:00",
	"18:00",
	"19:00",
	"20:00",
	"21:00",
	"22:00",
	"23:00",
	"00:00",
];

const buildTimeIntervals = () => ({
	"00:00-01:00": "nonWorkingHrs",
	"01:00-02:00": "nonWorkingHrs",
	"02:00-03:00": "nonWorkingHrs",
	"03:00-04:00": "nonWorkingHrs",
	"04:00-05:00": "nonWorkingHrs",
	"05:00-06:00": "nonWorkingHrs",
	"06:00-07:00": "nonWorkingHrs",
	"07:00-08:00": "nonWorkingHrs",
	"08:00-09:00": "nonWorkingHrs",
	"09:00-10:00": "nonWorkingHrs",
	"10:00-11:00": "nonWorkingHrs",
	"11:00-12:00": "nonWorkingHrs",
	"12:00-13:00": "nonWorkingHrs",
	"13:00-14:00": "nonWorkingHrs",
	"14:00-15:00": "nonWorkingHrs",
	"15:00-16:00": "nonWorkingHrs",
	"16:00-17:00": "nonWorkingHrs",
	"17:00-18:00": "nonWorkingHrs",
	"18:00-19:00": "nonWorkingHrs",
	"19:00-20:00": "nonWorkingHrs",
	"20:00-21:00": "nonWorkingHrs",
	"21:00-22:00": "nonWorkingHrs",
	"22:00-23:00": "nonWorkingHrs",
	"23:00-00:00": "nonWorkingHrs",
});

const buildJson = (json) => {
	return {
		"00:00-01:00": {
			timestamp: getStartingTimeStamp("00"),
			status: json == null ? "nonWorkingHrs" : json["00:00-01:00"],
		},
		"01:00-02:00": {
			timestamp: getStartingTimeStamp("01"),
			status: json == null ? "nonWorkingHrs" : json["01:00-02:00"],
		},
		"02:00-03:00": {
			timestamp: getStartingTimeStamp("02"),
			status: json == null ? "nonWorkingHrs" : json["02:00-03:00"],
		},
		"03:00-04:00": {
			timestamp: getStartingTimeStamp("03"),
			status: json == null ? "nonWorkingHrs" : json["03:00-04:00"],
		},
		"04:00-05:00": {
			timestamp: getStartingTimeStamp("04"),
			status: json == null ? "nonWorkingHrs" : json["04:00-05:00"],
		},
		"05:00-06:00": {
			timestamp: getStartingTimeStamp("05"),
			status: json == null ? "nonWorkingHrs" : json["05:00-06:00"],
		},
		"06:00-07:00": {
			timestamp: getStartingTimeStamp("06"),
			status: json == null ? "nonWorkingHrs" : json["06:00-07:00"],
		},
		"07:00-08:00": {
			timestamp: getStartingTimeStamp("07"),
			status: json == null ? "nonWorkingHrs" : json["07:00-08:00"],
		},
		"08:00-09:00": {
			timestamp: getStartingTimeStamp("08"),
			status: json == null ? "nonWorkingHrs" : json["08:00-09:00"],
		},
		"09:00-10:00": {
			timestamp: getStartingTimeStamp("09"),
			status: json == null ? "nonWorkingHrs" : json["09:00-10:00"],
		},
		"10:00-11:00": {
			timestamp: getStartingTimeStamp("10"),
			status: json == null ? "nonWorkingHrs" : json["10:00-11:00"],
		},
		"11:00-12:00": {
			timestamp: getStartingTimeStamp("11"),
			status: json == null ? "nonWorkingHrs" : json["11:00-12:00"],
		},
		"12:00-13:00": {
			timestamp: getStartingTimeStamp("12"),
			status: json == null ? "nonWorkingHrs" : json["12:00-13:00"],
		},
		"13:00-14:00": {
			timestamp: getStartingTimeStamp("13"),
			status: json == null ? "nonWorkingHrs" : json["13:00-14:00"],
		},
		"14:00-15:00": {
			timestamp: getStartingTimeStamp("14"),
			status: json == null ? "nonWorkingHrs" : json["14:00-15:00"],
		},
		"15:00-16:00": {
			timestamp: getStartingTimeStamp("15"),
			status: json == null ? "nonWorkingHrs" : json["15:00-16:00"],
		},
		"16:00-17:00": {
			timestamp: getStartingTimeStamp("16"),
			status: json == null ? "nonWorkingHrs" : json["16:00-17:00"],
		},
		"17:00-18:00": {
			timestamp: getStartingTimeStamp("17"),
			status: json == null ? "nonWorkingHrs" : json["17:00-18:00"],
		},
		"18:00-19:00": {
			timestamp: getStartingTimeStamp("18"),
			status: json == null ? "nonWorkingHrs" : json["18:00-19:00"],
		},
		"19:00-20:00": {
			timestamp: getStartingTimeStamp("19"),
			status: json == null ? "nonWorkingHrs" : json["19:00-20:00"],
		},
		"20:00-21:00": {
			timestamp: getStartingTimeStamp("20"),
			status: json == null ? "nonWorkingHrs" : json["20:00-21:00"],
		},
		"21:00-22:00": {
			timestamp: getStartingTimeStamp("21"),
			status: json == null ? "nonWorkingHrs" : json["21:00-22:00"],
		},
		"22:00-23:00": {
			timestamp: getStartingTimeStamp("22"),
			status: json == null ? "nonWorkingHrs" : json["22:00-23:00"],
		},
		"23:00-00:00": {
			timestamp: getStartingTimeStamp("23"),
			status: json == null ? "nonWorkingHrs" : json["23:00-00:00"],
		},
	};
};
export { TIMESTAMPS, buildTimeIntervals, buildJson };
