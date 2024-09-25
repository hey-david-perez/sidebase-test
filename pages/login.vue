<script setup lang="ts">
const router = useRouter()
const user = useCookie('user')
const username = ref<string>()

function login() {
  user.value = { username: username.value, role: 'user' }
  router.push(`clients/foo`)
}
</script>

<template>
  <div class="flex flex-col gap-5 w-2/3 justify-center mx-auto my-60">
    <NInput v-model:value="username" type="text" placeholder="User" />
    <NInput type="password" placeholder="Password" required />
    <NButton type="success" :disabled="!username" @click="login">
      Log in
    </NButton>
  </div>
</template>
