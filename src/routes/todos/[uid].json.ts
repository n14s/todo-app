import { api } from "./_api";
import type { RequestHandler } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit/types/private";

export const del : RequestHandler = (requestEvent : RequestEvent) => {
    let request = requestEvent.request;
    return api(requestEvent)
}
