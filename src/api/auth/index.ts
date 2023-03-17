import axios from "axios";
import server from "..";
import { handleError } from "../../utils/helpers"
import { SigninProps, SignupProps, VerificationProps } from "./types";

export const signinUser = async(props: any) => {
    try {
        const response = await server.post("/auth/signin", props);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const emailSignup = async(username: string) => {
    try {
        const response = await server.post("/auth/email-signup", {username});
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const emailVerification = async(verificationProps: VerificationProps) => {
    try {
        const response = await server.get(`/auth/email-verification?t_k=${verificationProps.t_k}&r_t=${verificationProps.r_t}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const signup = async(props: SignupProps) => {
    try {
        const response = await server.post("/auth/signup", props);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}


export const signout = async() => {
    try {
        const response = await server.get('/auth/signout');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}