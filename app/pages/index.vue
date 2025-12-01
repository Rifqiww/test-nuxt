<script setup lang="ts">
import { ref, computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { useTodoStore, type Todo } from "../stores/todoStores";
import TodoItem from "../components/TodoItem.vue";
import TodoModal from "../components/TodoModal.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const store = useTodoStore();
const isModalVisible = ref(false);
const editingTodo = ref<Todo | null>(null);
const confirm = useConfirm();
const toast = useToast();

const openAddModal = () => {
  editingTodo.value = null;
  isModalVisible.value = true;
};

const openEditModal = (todo: Todo) => {
  editingTodo.value = todo;
  isModalVisible.value = true;
};

const confirmDelete = (todo: Todo) => {
  confirm.require({
    message: "Are you sure you want to delete this task?",
    header: "Delete Confirmation",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: () => {
      store.removeTodo(todo.id);
    },
  });
};

const activeTodoList = computed({
  get: () => store.tasks.filter((t) => !t.completed),
  set: (val) => {
    const completed = store.tasks.filter((t) => t.completed);
    store.reorderTodos([...val, ...completed]);
  },
});

const completedTodoList = computed(() =>
  store.tasks.filter((t) => t.completed)
);
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 font-sans transition-colors duration-300"
  >
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
            My Tasks
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">
            Manage your daily goals
          </p>
        </div>
        <Button
          label="New Task"
          icon="pi pi-plus"
          @click="openAddModal"
          rounded
        />
      </div>

      <!-- Tugas blom selesai -->
      <VueDraggable
        v-model="activeTodoList"
        :animation="150"
        handle=".handle"
        class="flex flex-col gap-2"
        group="todos"
      >
        <TodoItem
          v-for="todo in activeTodoList"
          :key="todo.id"
          :todo="todo"
          @edit="openEditModal"
          @delete="confirmDelete"
        />
      </VueDraggable>

      <!-- Tugas selesai -->
      <div v-if="completedTodoList.length > 0" class="mt-8">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Completed Tasks
        </h2>
        <div class="flex flex-col gap-2 opacity-75">
          <TodoItem
            v-for="todo in completedTodoList"
            :key="todo.id"
            :todo="todo"
            @edit="openEditModal"
            @delete="confirmDelete"
          />
        </div>
      </div>

      <div
        v-if="store.tasks.length === 0"
        class="text-center text-gray-500 mt-16 flex flex-col items-center"
      >
        <i
          class="pi pi-check-square text-6xl mb-4 text-gray-300 dark:text-gray-700"
        ></i>
        <p class="text-lg font-medium">No tasks yet</p>
        <p class="text-sm">Add a new task to get started!</p>
      </div>

      <TodoModal
        v-model:visible="isModalVisible"
        :todoToEdit="editingTodo"
        close="editingTodo = null"
      />
    </div>
  </div>
</template>
