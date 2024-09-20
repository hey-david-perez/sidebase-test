<script lang="ts" setup>
import { parse } from 'best-effort-json-parser'
import { ref, computed } from 'vue'
import Mermaid from 'vue-mermaid-string'

const message = ref(`ADVANCED PASSIVE NOISE CANCELLATION — sturdy closed earcups fully cover ears to prevent noise from leaking into the headset, with its cushions providing a closer seal for more sound isolation.
7.1 SURROUND SOUND FOR POSITIONAL AUDIO — Outfitted with custom-tuned 50 mm drivers, capable of software-enabled surround sound. *Only available on Windows 10 64-bit
TRIFORCE TITANIUM 50MM HIGH-END SOUND DRIVERS — With titanium-coated diaphragms for added clarity, our new, cutting-edge proprietary design divides the driver into 3 parts for the individual tuning of highs, mids, and lowsproducing brighter, clearer audio with richer highs and more powerful lows
LIGHTWEIGHT DESIGN WITH BREATHABLE FOAM EAR CUSHIONS — At just 240g, the BlackShark V2X is engineered from the ground up for maximum comfort
RAZER HYPERCLEAR CARDIOID MIC — Improved pickup pattern ensures more voice and less noise as it tapers off towards the mic’s back and sides
CROSS-PLATFORM COMPATIBILITY — Works with PC, Mac, PS4, Xbox One, Nintendo Switch via 3.5mm jack, enjoy unfair audio advantage across almost every platform. *Xbox One stereo adapter may be required, purchase separately
#1 SELLING PC GAMING PERIPHERALS BRAND IN THE U.S. — Source — Circana, Retail Tracking Service, U.S., Dollar Sales, Gaming Designed Mice, Keyboards, and PC Headsets, Jan. 2019- Dec. 2023 combined
`)

const returnResponse = ref('')
const parsedResponse = computed(() => {
  try {
    return parse(returnResponse.value)
  } catch {
    return null
  }
})

async function handleSendMessage() {
  // Send message to the API and handle streaming response
  const response = await fetch('/api/streamDemo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: message.value,
    }),
  })

  if (!response.body) {
    throw new Error('ReadableStream not supported in this browser.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let result = ''

  // Create a single message for the stream response
  const streamMessageId = Date.now()
  returnResponse.value = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done)
      break
    result += decoder.decode(value, { stream: true })
    returnResponse.value = result
  }

  // Clear the input field
  message.value = ''
}

</script>
<template>
  <h1 class="text-2xl font-bold">Stream From Server Demo</h1>
  <div class="flex flex-col space-y-4 p-4">
    <textarea v-model="message" placeholder="Enter your message" class="bg-gray-800 w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
    <button @click="handleSendMessage" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Send</button>
    <div v-if="parsedResponse" class="gap-4 grid grid-cols-3">
      <div v-for="(value, key) in parsedResponse" :key="key" class="min-h-30 p-4 rounded-md bg-gray-700">
        <h2 class="text-lg font-bold text-white">{{ key }}</h2>
        <div v-if="Array.isArray(value)">
          <div v-for="(item, index) in value" :key="index" class="p-2 bg-gray-600 rounded-md mt-2">
            <p class="text-gray-300">{{ item }}</p>
          </div>
        </div>
        <p v-else-if="typeof value === 'string' && value.includes('graph')" class="text-gray-300">
          <Mermaid :value="value" />
        </p>
        <p v-else class="text-gray-300">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes appear {
  from {
    filter: hue-rotate(0deg);
    transform: scale(0.5);
  }
  to {
    filter: hue-rotate(360deg);
    transform: scale(1);
  }
}
.animate-appear {
  animation: appear 0.5s ease-in-out;
}
</style>