import { api } from "./_api";
import type { RequestHandler } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit/types/private";

export const del : RequestHandler = (requestEvent : RequestEvent) => {
    let request = requestEvent.request;
    return api(requestEvent)
}

export const patch : RequestHandler = async (requestEvent: RequestEvent) => {
    const formData = await requestEvent.request.formData();
    return api(requestEvent, {
        text: formData.get("text"), 
        done : formData.has("done") ? formData.get("done") === "true" : undefined
    })
}
