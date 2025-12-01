import { defineStore } from "pinia";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    tasks: [] as Todo[],
  }),
  actions: {
    addTodo(title: string) {
      this.tasks.push({
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
    removeTodo(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    updateTodo(id: number, updates: Partial<Todo>) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, { ...updates, updatedAt: new Date() });
      }
    },
    reorderTodos(newOrder: Todo[]) {
      this.tasks = newOrder;
    },
  },
});
