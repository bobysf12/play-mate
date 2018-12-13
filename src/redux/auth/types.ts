export interface AuthState {
    loggedInUserId?: string;
    token?: string;
    isLoggingIn?: boolean;
    isRegistering?: boolean;
}

export interface User {
    name: string;
    username: string;
    id: string;
}
