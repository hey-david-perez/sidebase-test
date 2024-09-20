<script setup lang="ts">
const router = useRouter()

function handleClick(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="nav">
    <button @click="handleClick('sockets')">
      sockets
    </button>
    <button @click="handleClick('bullmq')">
      bullmq
    </button>
    <button @click="handleClick('crons')">
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
