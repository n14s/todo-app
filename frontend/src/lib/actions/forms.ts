export let enhance = (form : HTMLFormElement, {
    result
}) => {
    
    const handleSubmit = async (event: Event) => {
        event.preventDefault()

        try {
            const res = await fetchFormDataAsJson( form );

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

const fetchFormDataAsJson = async ( form : HTMLFormElement ) => {
        const url = form.action
        const body = new FormData(form)

        const plainFormData = Object.fromEntries(body.entries());
        const formDataJsonString = JSON.stringify(plainFormData);	

        const fetchOptions = {
            method : form.method,
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: formDataJsonString,
        }

        const response = await fetch(url, fetchOptions)

        return response
    }