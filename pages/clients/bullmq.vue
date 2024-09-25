<script setup lang="ts">
const message = ref('')

async function runJob() {
  await $fetch('/api/bullmq', {
    method: 'POST',
    body: { message: message.value },
  })
}
</script>

<template>
  <div class="mt-10 flex flex-col justify-center items-center">
    message:
    <input v-model="message" class="mt-3 p-2 border rounded">
    <button class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="runJob">
      run job
    </button>
  </div>
</template>
