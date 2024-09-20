<script setup lang="ts">
const router = useRouter()

function handleClick(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="nav">
    <button @click="handleClick('/demo/sockets')">
      sockets
    </button>
    <button @click="handleClick('/demo/bullmq')">
      bullmq
    </button>
    <button @click="handleClick('/demo/crons')">
      crons
    </button>
  </div>

  <NuxtPage />
</template>

<style>
.nav{
  display: flex;
  background-color: #f1f1f1;
}

button{
  padding: 1rem;
}

button:hover{
  background-color: #555;
  color: white;
}
</style>
