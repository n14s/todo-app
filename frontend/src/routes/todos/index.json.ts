import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const get : RequestHandler = async (requestEvent) => { return api(requestEvent); }

export const post : RequestHandler = async (requestEvent) => {

    const body = await requestEvent.request.formData();

    let newTodo = {
        created_at : new Date(),
        text : body.get('text') as string,
        done : false
    }

    return api(requestEvent, newTodo);
}