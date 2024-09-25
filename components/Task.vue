<script setup lang="ts">
import { type Todo, TodoStatus } from '@prisma/client'

const props = defineProps<{
  todo: Todo
  deleteHandler: () => Promise<void>
  updateHandler: (body: Partial<Todo>) => Promise<void>
}>()

const options = [
  {
    label: 'Done',
    value: TodoStatus.DONE
  },
  {
    label: 'To do',
    value: TodoStatus.TODO
  }
]

const newDueTo = ref<string>()
const newStatus = ref<TodoStatus>()

watch([newDueTo, newStatus], async () => {
  props.updateHandler({
    dueTo: new Date(newDueTo.value || new Date(props.todo.dueTo!)),
    status: newStatus.value
  })
})
</script>

<template>
  <NCard :title="props.todo.title">
    <template #header-extra>
      <NButton type="error" @click="deleteHandler">
        Delete
      </NButton>
    </template>
    {{ props.todo.description }}
    <div class="flex items-center mt-3">
      status: <NSelect v-model:value="newStatus" class="w-1/5" :options="options" :default-value="props.todo.status" />
    </div>
    <div class="flex items-center mt-3">
      Due Date: <NDatePicker
        v-model:formatted-value="newDueTo"
        :default-value="new Date(props.todo.dueTo!).valueOf()"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        clearable
      />
    </div>
  </NCard>
</template>
