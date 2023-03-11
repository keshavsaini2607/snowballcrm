import axios from "axios";
import server from "..";
import { handleError } from "../../utils/helpers"
import { SigninProps, SignupProps } from "./types";

export const signinUser = async(props: SigninProps) => {
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

export const emailVerification = async() => {
    try {
        const response = await server.get("/auth/email-verification");
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



export const demo = async() => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/10");
        return response.data;
    } catch (error) {
        handleError(error);
    }
}