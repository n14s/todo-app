import type { RequestEvent } from "@sveltejs/kit/types/private";

export let todos : Todo[] = []

export const api = ( requestEvent : RequestEvent, todo? : Todo) => {

    let body = {}
    let status = 500
    let request = requestEvent.request

    switch (request.method.toUpperCase()) {
        case "GET":
            status = 200;
            body = todos;
            break;

        case "POST":
            todos.push(todo);
            status = 201;
            body = todo;
            break;

        case "DELETE":
            status = 200;
            todos = todos.filter( todo => todo.uid !== requestEvent.params.uid)
            break;
    }

    if (request.method.toUpperCase() != "GET") {
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