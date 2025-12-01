<script setup lang="ts">
import { type PropType } from "vue";
import { type Todo, useTodoStore } from "../stores/todoStores";

const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);
const store = useTodoStore();

const toggleComplete = (val: boolean) => {
  store.updateTodo(props.todo.id, { completed: val });
};

const deleteTodo = () => {
  emit("delete", props.todo);
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
</script>

<template>
  <div
    class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-2 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md"
  >
    <div class="flex items-center gap-3 flex-1">
      <div
        class="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 handle p-2"
      >
        <i class="pi pi-bars text-lg"></i>
      </div>
      <Checkbox
        :modelValue="todo.completed"
        binary
        @update:modelValue="toggleComplete"
      />
      <div class="flex flex-col">
        <span
          :class="[
            'font-medium text-gray-800 dark:text-gray-200',
            { 'line-through text-gray-500 dark:text-gray-500': todo.completed },
          ]"
        >
          {{ todo.title }}
        </span>
        <span class="text-xs text-gray-400">
          {{ formatDate(todo.updatedAt) }}
        </span>
      </div>
    </div>
    <div class="flex gap-1">
      <Button
        icon="pi pi-pencil"
        text
        severity="secondary"
        aria-label="Edit"
        @click="emit('edit', todo)"
      />
      <Button
        icon="pi pi-trash"
        text
        severity="danger"
        aria-label="Delete"
        @click="deleteTodo"
      />
    </div>
  </div>
</template>
