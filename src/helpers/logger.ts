export enum LogLevel {
	OFF = 5,
	ERROR = 4,
	WARN = 3,
	INFO = 2,
	DEBUG = 1,
}

class Logger {
	private namespace: string = "";

	private logLevel: LogLevel = LogLevel.DEBUG;

	constructor(namespace: string) {
		this.namespace = namespace;
	}

	public setLogLevel(newLogLevel: LogLevel) {
		this.logLevel = newLogLevel;
	}

	private getNamespace() {
		return `[${this.namespace}]`;
	}

	public debug(...args: any[]): void {
		if (LogLevel.DEBUG >= this.logLevel) {
			// tslint:disable-next-line
			console.debug(this.getNamespace(), ...args);
		}
	}

	public info(...args: any[]): void {
		if (LogLevel.INFO >= this.logLevel) {
			// tslint:disable-next-line
			console.info(this.getNamespace(), ...args);
		}
	}

	public warn(...args: any[]): void {
		if (LogLevel.WARN >= this.logLevel) {
			// tslint:disable-next-line
			console.warn(this.getNamespace(), ...args);
		}
	}

	public error(...args: any[]): void {
		if (LogLevel.ERROR >= this.logLevel) {
			// tslint:disable-next-line
			console.error(this.getNamespace(), ...args);
		}
	}
}

export default function createLogger(namespace: string) {
	return new Logger(namespace);
}
