import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const get : RequestHandler = async (requestEvent) => { return api(requestEvent); }

export const post : RequestHandler = async (requestEvent) => {


    const formData = await requestEvent.request.formData();

    let todo : Todo = {
        uid : `${Date.now()}`, // TODO: use uid from db
        created_at : new Date(),
        text : formData.get('text') as string,
        done : false
    }

    return api(requestEvent, todo);
}
// <{}, FormData>