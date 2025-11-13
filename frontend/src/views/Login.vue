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
          login(username, password).then(
            (res) => this.response = res
        )
      }
    }
}
</script>

<template>
    <input v-model="username" placeholder="usuario"></input>
    <input v-model="password" type="password" placeholder="senha"></input>
    <button @click="buttonHandler">Login</button>
    <p>{{ response }}</p>
</template>

<
