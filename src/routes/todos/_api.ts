import type { RequestEvent } from "@sveltejs/kit/types/private";

export let todos : Todo[] = []

export const api = ( requestEvent : RequestEvent, data? : Record<string, unknown>) => {

    let body = {}
    let status = 500
    let request = requestEvent.request
switch (request.method.toUpperCase()) {
        case "GET":
            status = 200;
            body = todos;
            break;

        case "POST":
            todos.push(data as Todo);
            status = 201;
            body = data as Todo;
            break;

        case "DELETE":
            status = 200;
            todos = todos.filter( todo => todo.uid !== requestEvent.params.uid)
            break;

        case "PATCH":
            status = 200;
            todos = todos.map(todo => {
                if (todo.uid === requestEvent.params.uid) {
                    if (data.text == undefined) {
                        todo.done = data.done as boolean
                    } else {
                        todo.text = data.text as string
                    }
                }
            return todo
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