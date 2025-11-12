<script>
const createUser = async (username, password) => {
    let f = await fetch("/api/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            senha: password
        })
    })

    return f.json()
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
            createUser(this.username, this.password).then(
                (res) => this.response = res
            )
        }
    }
}
</script>

<template>
    <input v-model="username" placeholder="usuario"></input>
    <input v-model="password" type="password" placeholder="senha"></input>
    <button @click="buttonHandler">Criar usuario</button>
    <p>{{ response }}</p>
</template>

<style scoped></style>
