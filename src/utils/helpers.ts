
export const handleError = (error: any) => {
    console.error("error", error);
    throw new Error(error);
}