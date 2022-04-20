export let enhance = (form : HTMLFormElement, {
    result
}) => {
    
    const handleSubmit = async (event: Event) => {
        event.preventDefault()

        try {
            const body = new FormData(form)
            const res = await fetch(form.action, {
                method: form.method,
                headers: {
                    accept: "application/json"
                },
                body: body
            })
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

    // const formdata = await requestEvent.request.formData() 

    // await fetch()

    return {
        destroy() {
            form.removeEventListener("submit", handleSubmit)

            console.log("destroy handle")
        }
    }
}