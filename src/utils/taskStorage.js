import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@taskflow_tasks';

export const getTasks = async () => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
    if (tasksJson !== null) {
      return JSON.parse(tasksJson);
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const addTask = async (task) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = [...tasks, task];
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      return tasks;
    }
    
    throw new Error('Task not found');
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const clearAllTasks = async () => {
  try {
    await AsyncStorage.removeItem(TASKS_KEY);
    return [];
  } catch (error) {
    console.error('Error clearing tasks:', error);
    throw error;
  }
};

export const getTaskStats = async () => {
  try {
    const tasks = await getTasks();
    const now = new Date();
    
    const stats = {
      total: tasks.length,
      completed: tasks.filter(task => task.completed).length,
      pending: tasks.filter(task => !task.completed).length,
      overdue: tasks.filter(task => {
        if (task.completed) return false;
        if (!task.dueDate) return false;
        return new Date(task.dueDate) < now;
      }).length,
    };
    
    return stats;
  } catch (error) {
    console.error('Error getting task stats:', error);
    return {
      total: 0,
      completed: 0,
      pending: 0,
      overdue: 0,
    };
  }
};

export const getTasksByPriority = async (priority) => {
  try {
    const tasks = await getTasks();
    return tasks.filter(task => task.priority === priority);
  } catch (error) {
    console.error('Error getting tasks by priority:', error);
    return [];
  }
};

export const getCompletedTasksCount = async () => {
  try {
    const tasks = await getTasks();
    return tasks.filter(task => task.completed).length;
  } catch (error) {
    console.error('Error getting completed tasks count:', error);
    return 0;
  }
};