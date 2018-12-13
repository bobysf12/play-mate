export function getLocation(callBack: PositionCallback, errCallBack?: PositionErrorCallback) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(callBack, errCallBack);
	} else {
		// tslint:disable-next-line
		console.error("Cannot get location");
	}
}
