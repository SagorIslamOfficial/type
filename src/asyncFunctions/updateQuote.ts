import { Dispatch, SetStateAction } from "react";

export async function updateQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const { statusCode, statusMessage, ...data } = await response.json();
        if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
        return (data);
    } catch (error) {
        // If the API request failed, log the error to console and update state
        // so that the error will be reflected in the UI.
        console.error(error);
        return ({ content: "Opps... Something went wrong" });
    }
}