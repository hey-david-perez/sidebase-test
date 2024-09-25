<script setup lang="ts">
import type { Todo } from '@prisma/client'
import { TodoStatus } from '@prisma/client'

const newListName = ref<string>()

const newTaskListId = ref<number>()
const newTaskTitle = ref<string>()
const newTaskDescription = ref<string>()
const newTaskDueTo = ref<string>()

const showListModal = ref<boolean>()
const showTaskModal = ref<boolean>()

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

const { data: todoLists, refresh } = await useFetch('/api/client/test/todo-lists', {
  headers: { Authorization: '234' },
  key: `Todo list`
})

async function createNewTaskModal(listId: number) {
  newTaskListId.value = listId
  showTaskModal.value = true
}

async function createListHandler() {
  await $fetch('/api/client/test/todo-lists', {
    headers: { Authorization: '234' },
    method: 'POST',
    body: { name: newListName.value },
  })
  showListModal.value = false
  refresh()
}

async function createTaskHandler(listId: number) {
  await $fetch(`/api/client/test/todo-lists/${listId}/todos`, {
    headers: { Authorization: '234' },
    method: 'POST',
    body: { title: newTaskTitle.value, description: newTaskDescription.value, dueTo: newTaskDueTo.value },
  })
  showTaskModal.value = false
  refresh()
}

async function deleteListHandler(listId: number) {
  await $fetch(`/api/client/test/todo-lists/${listId}`, {
    headers: { Authorization: '234' },
    method: 'DELETE'
  })
  refresh()
}

function deleteTodoHandler(listId: number, todoId: number) {
  async function handler() {
    await $fetch(`/api/client/test/todo-lists/${listId}/todos/${todoId}`, {
      headers: { Authorization: '234' },
      method: 'DELETE'
    })
    refresh()
  }
  return handler
}

function updateTodoHandler(listId: number, todoId: number,) {
  async function handler(body: Partial<Todo>) {
    await $fetch(`/api/client/test/todo-lists/${listId}/todos/${todoId}`, {
      headers: { Authorization: '234' },
      method: 'PUT',
      body
    })
  }
  return handler
}
</script>

<template>
  <!-- lists -->
  <NCard v-for="list in todoLists" :key="list.id" :title="list.name">
    <template #header-extra>
      <NButton type="error" @click="deleteListHandler(list.id)">
        Delete
      </NButton>
    </template>
    <!-- todos -->
    <h1>Status: {{ list.status ?? 'No Status...' }}</h1>
    <h1>Tasks:</h1>
    <NScrollbar class="max-h-60 my-5">
      <Task
        v-for="todo in list.tasks"
        :key="todo.id"
        :todo="todo"
        :delete-handler="deleteTodoHandler(list.id, todo.id)"
        :update-handler="updateTodoHandler(list.id, todo.id)"
      />
    </NScrollbar>
    <NButton type="info" @click="createNewTaskModal(list.id)">
      +
    </NButton>
  </NCard>

  <div class="flex justify-center">
    <NButton type="primary" class="my-10 w-60" @click="() => showListModal = true">
      Create New List
    </NButton>
  </div>

  <!-- new list modal -->
  <NModal v-model:show="showListModal" class="w-2/3">
    <NCard title="Create new list">
      <NInput v-model:value="newListName" type="text" placeholder="List Name" />
      <div class="flex justify-center">
        <NButton type="primary" class="my-10 w-1/3" @click="createListHandler">
          Create
        </NButton>
      </div>
    </NCard>
  </NModal>

  <!-- new todo modal -->
  <NModal v-model:show="showTaskModal" class="w-2/3">
    <NCard title="Create new task">
      Task name:
      <NInput v-model:value="newTaskTitle" type="text" class="mb-5" placeholder="List Name" />
      Task description:
      <NInput
        v-model:value="newTaskDescription" type="textarea" class="mb-5" placeholder="Text Description"
      />
      Task due date:
      <NDatePicker
        v-model:formatted-value="newTaskDueTo"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        clearable
      />
      <div class="flex justify-center">
        <NButton type="info" class="my-10 w-1/3" @click="createTaskHandler(newTaskListId!)">
          Create
        </NButton>
      </div>
    </NCard>
  </NModal>
</template>
