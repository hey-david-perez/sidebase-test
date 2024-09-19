<script setup lang="ts">
// In prod: check if secure, then use wss://
const { status, data, send, open, close } = useWebSocket(`ws://${location.host}/api/websocket`, {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed(){
      console.log('WebSocket connection failed')
    }
  },
  heartbeat: true,
})

const history = ref<string[]>([])
watch(data, (newValue) => {
  history.value.push(`server: ${newValue}`)
})

const message = ref('')
function sendData(){
  history.value.push(`client: ${message.value}`)
  send(message.value)
  message.value = ''
}
</script>

<template>
  <div class="container mx-auto p-4 max-w-md">
    <h1 class="text-2xl font-bold mb-4">WebSocket - let's go!</h1>
    <form @submit.prevent="sendData" class="mb-4">
      <div class="flex space-x-2">
        <input
          v-model="message"
          class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        >
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send
        </button>
      </div>
    </form>
    <div class="space-y-2">
      <p
        v-for="entry in history"
        class="p-2 bg-gray-100 rounded-md"
      >
        {{ entry }}
      </p>
    </div>
  </div>
</template>