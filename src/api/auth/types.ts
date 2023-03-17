export interface SigninProps {
    username: string;
    password: string;
}

export interface SignupProps {
    token: string;
    r_token: string;
    password: string;
}

export interface VerificationProps {
    t_k: string;
    r_t: string;
}