import type { RequestEvent } from "@sveltejs/kit/types/private";
import PrismaClient from "$lib/prisma"

const prisma = new PrismaClient();

export const api = async ( requestEvent : RequestEvent, data? : Record<string, unknown>) => {
    let body = {}
    let status = 500
    let request = requestEvent.request

    switch (request.method.toUpperCase()) {
        case "GET":
            status = 200;
            body = await prisma.todo.findMany();
            break;

        case "POST":
            body = await prisma.todo.create({
                data: {
                    created_at: data.created_at as Date,
                    text: data.text as string,
                    done: data.done as boolean,
                }
            })
            status = 201;
            break;

        case "DELETE":
            status = 200;
            body = await prisma.todo.delete({
                where: {
                    uid: requestEvent.params.uid
                }
            })
            break;

        case "PATCH":
            status = 200;
            body = await prisma.todo.update({
                where: {
                    uid: requestEvent.params.uid
                },
                data: {
                    done: data.done,
                    text: data.text
                }
            })
            break;
    }

    if (request.method.toUpperCase() !== "GET" && request.headers.get("accept") !== "application/json") {
        return {
            status : 303,
            headers : {
                location : "/"
            }
        }
    }

    return {
        status,
        body
    }
}