import type { RequestEvent } from "@sveltejs/kit/types/private";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (requestEvent: RequestEvent, data?: Record<string, unknown>) => {

    let body = {};
    let bodystring = "";
    let status = 500;
    let request = requestEvent.request;
    let url = "http://localhost:8000/todo";

    switch (request.method.toUpperCase()){
            case "GET":
                bodystring = JSON.stringify(data)
                break
            case "POST":
                bodystring = JSON.stringify(data)
                break
            case "DELETE":
                bodystring = JSON.stringify({"uid": requestEvent.params.uid})
                break
            case "PATCH":
                data["uid"]=requestEvent.params.uid
                bodystring = JSON.stringify(data) 
        }

    const fetchOptions = {
        method : request.method,
        headers : {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: bodystring
    }

  const response = await fetch(url, fetchOptions);
  return response;

}
