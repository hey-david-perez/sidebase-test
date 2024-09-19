<script setup lang="ts">
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

const formMessage = ref('there you go')
const state = reactive({messages: []})

let socket: Socket | undefined

const sendMessage = () => {
  socket?.emit('message-channel', formMessage.value)
}

const sendMessageViaApi = async () => {
  socket?.emit('message-channel', formMessage.value)
  await $fetch('/api/test-message', {
    method: 'POST',
    body: { message: formMessage.value },
  })
}

onMounted(async () => {
  socket = io(`${location.protocol === 'https:' ? 'wss://' : 'ws://' }${location.host}`)

  socket.on('message-channel', (messageValue: string) => {
    try {
      console.log('Frontend received: ', messageValue)
      state.messages.push(messageValue)
    } catch (e) { console.error(e) }
  })
})

onUnmounted(() => {
  socket?.disconnect()
})
</script>

<template>
  <div class="p-4 bg-gray-800 rounded-lg shadow">
    <ul class="mb-4 space-y-2">
      <li v-for="message of state.messages" :key="message" class="text-gray-300">
        {{ message }}
      </li>
    </ul>
    <form @submit.prevent="sendMessage" class="flex flex-col space-y-2">
      <input v-model="formMessage" class="p-2 border rounded bg-gray-700 text-white" />
      <div class="flex space-x-2">
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send message</button>
        <button type="button" @click="sendMessageViaApi()" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Send via api</button>
      </div>
    </form>
  </div>
</template>