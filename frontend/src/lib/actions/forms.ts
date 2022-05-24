export let enhance = (form : HTMLFormElement, {
    result
}) => {
    
    const handleSubmit = async (event: Event) => {
        event.preventDefault()

        try {
            const url = form.action
            const body = new FormData(form)

            const res = await postFormDataAsJson({ url, body });

            if (res.ok) {
                result(res, form);
            } else {
                console.error("Error: ", await res.text())
            }

        } catch (error) {
            console.error("Could not submit: ", error)
        }

    }
    console.log("add handle submit")
    form.addEventListener("submit", handleSubmit)

    return {
        destroy() {
            form.removeEventListener("submit", handleSubmit)
            console.log("destroy handle")
        }
    }
}

const postFormDataAsJson = async ({url, body}) => {
        const plainFormData = Object.fromEntries(body.entries());
        const formDataJsonString = JSON.stringify(plainFormData);	

        const fetchOptions = {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: formDataJsonString,
        }

        const response = await fetch(url, fetchOptions)

        return response
    }