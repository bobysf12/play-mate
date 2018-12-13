export interface AuthState {
	loggedInUserId?: string;
	token?: string;
	isLoggingIn?: boolean;
	isRegistering?: boolean;
}
