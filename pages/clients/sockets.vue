<script setup lang="ts">
import { io } from 'socket.io-client'

const message = ref('')
const response = ref('')

const socket = io('ws://localhost:4040')

socket.on('hello', (arg) => {
  response.value = arg
})

function handleClick(message: string) {
  socket.emit('howdy', message)
}
</script>

<template>
  <div class="mt-10 flex flex-col justify-center items-center">
    message:
    <input v-model="message" class="mt-3 p-2 border rounded">
    <button class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="handleClick(message)">
      Send message
    </button>
    <div class="mt-5">
      response:
    </div>
    <div>
      {{ response }}
    </div>
  </div>
</template>
