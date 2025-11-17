<script>
const login = async (username, password) => {
    let f = await fetch("/api/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            senha: password
        })
    })

    return [f.status, await f.json()]
}

const checkRedirect = async (url) => {
    let f = await fetch(url)

    return f.status;
}

const redirect = (subpath) => {
    window.location.assign(window.location.origin + subpath)
}

export default {
    data() {
        return {
            "username": "",
            "password": "",
            "response": "No response yet"
        }
    },
    methods: {
        buttonHandler() {
            login(this.username, this.password).then(([status, json]) => {
                this.response = json

                if (status != 401) {
                    redirect('/editor')
                }
            });
        }
    },
    mounted() {
        checkRedirect("/editor").then((status) => {
            if (status != 401) redirect('/editor')
        })
    }
}
</script>

<template>
    <input v-model="username" placeholder="usuario"></input>
    <input v-model="password" type="password" placeholder="senha"></input>
    <button @click="buttonHandler">Login</button>
    <p>{{ response }}</p>
</template>