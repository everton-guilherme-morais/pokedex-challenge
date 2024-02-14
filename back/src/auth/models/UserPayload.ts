export interface UserPayload {
    sub: number;
    email: string;
    userName: string;
    iat?: number;
    exp?: number;
}