<script context="module" lang="ts">
    import type {Load} from "@sveltejs/kit"
    import { enhance } from "$lib/actions/forms" 


    export const load: Load = async ({fetch}) => {
        const res = await fetch("/todos.json")
    
        if (res.ok) {
            const todos = await res.json()
            return {
                props : { todos }
            }
        }
        
        const { message } = await res.json()
        return {
            error: new Error(message)
        }
    }
</script>


<script lang="ts">
    import TodoItem from "$lib/todo-item.svelte";

    const title = "Todo";

    export let todos : Todo[];

    const processNewTodoResult = async (res: Response, form: HTMLFormElement) => {
        let todo = await res.json()
        todos = [...todos, todo]
        form.reset()
    }

    const processUpdateTodoResult = async (res: Response) => {
        const updatedTodo = await res.json()
        todos = todos.map(todo => {
            if (todo.uid === updatedTodo.uid) {
                todo = updatedTodo
            }
            return todo
        })
    }

</script>

<style>
    .todos {
        width: 100%;
        max-width: 42rem;
        margin: 4em auto 0 auto;
    }

    .new {
        margin: 0 0 0.5rem 0;
    }

    .new input {
        font-size: 28px;
        width: 100%;
        padding: 0.5em 1em 0.3em 1em;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        text-align: center;
    }

    .todos :global(input){
        border: 1px solid transparent;
    }

    .todos :global(input:focus-visible){
        box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #ff3e00 !important;
        outline: none;
    }

</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
<h1>{title}</h1>

<a href="/about-us">about-us</a>

<form action="/todos.json" method="post" class="new" use:enhance={{result: processNewTodoResult}}>
    <input type="text" name="text" aria-label="Add a todo" placeholder="+ type to add a todo"  />
</form>
{#each todos as todo}
    <TodoItem 
    todo = { todo } 
    processDeleteTodoResult = { () => {
        todos = todos.filter(t => t.uid !== todo.uid)
     }} 
    {processUpdateTodoResult}
    />
{/each}

</div>