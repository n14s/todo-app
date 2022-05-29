import type { RequestEvent } from "@sveltejs/kit/types/private";
import PrismaClient from "$lib/prisma"

const prisma = new PrismaClient();

export const api = async ( requestEvent : RequestEvent, data? : Record<string, unknown>) => {
    let body = {}
    let status = 500
    let request = requestEvent.request
    let url = "http://localhost:8000/todo"

    const fetchOptions = {
        method : request.method,
        headers : {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, fetchOptions)
    return response
}