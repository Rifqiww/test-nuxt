<script setup lang="ts">
import { ref, watch, type PropType } from "vue";
import { type Todo, useTodoStore } from "../stores/todoStores";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  todoToEdit: {
    type: Object as PropType<Todo | null>,
    default: null,
  },
});

const emit = defineEmits(["update:visible", "close"]);
const store = useTodoStore();
const toast = useToast();
const title = ref("");

watch(
  () => props.todoToEdit,
  (newVal) => {
    if (newVal) {
      title.value = newVal.title;
    } else {
      title.value = "";
    }
  }
);

const saveTodo = () => {
  if (!title.value.trim()) return;

  if (props.todoToEdit) {
    store.updateTodo(props.todoToEdit.id, { title: title.value });
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task updated successfully",
      life: 3000,
    });
  } else {
    store.addTodo(title.value);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task added successfully",
      life: 3000,
    });
  }
  closeModal();
};

const closeModal = () => {
  title.value = "";
  emit("update:visible", false);
  emit("close");
};
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="(val) => emit('update:visible', val)"
    modal
    :header="todoToEdit ? 'Edit Task' : 'New Task'"
    :style="{ width: '25rem' }"
    class="p-0"
  >
    <div class="flex flex-col gap-4 mb-4 pt-2">
      <div class="flex flex-col gap-2">
        <label for="title" class="font-semibold">Task Name</label>
        <InputText
          id="title"
          v-model="title"
          class="flex-auto"
          autocomplete="off"
          placeholder="What needs to be done?"
          @keyup.enter="saveTodo"
        />
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" label="Cancel" @click="closeModal"></Button>
      <Button type="button" label="Save" @click="saveTodo"></Button>
    </div>
  </Dialog>
</template>
