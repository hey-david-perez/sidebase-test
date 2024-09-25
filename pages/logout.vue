<script setup lang="ts">
const user = useCookie('user')
const router = useRouter()

function logout() {
  user.value = null
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-col gap-5 w-2/3 justify-center mx-auto my-60">
    <h1 class="text-center">
      Logged in as: {{ user.username }}
    </h1>
    <NButton type="error" @click="logout">
      Log out
    </NButton>
  </div>
</template>
