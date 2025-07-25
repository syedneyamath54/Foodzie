import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  FAB,
  Chip,
  IconButton,
  Portal,
  Modal,
  TextInput,
  Paragraph,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, shadows } from '../styles/theme';
import { getTasks, addTask, updateTask, deleteTask } from '../utils/taskStorage';

const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleAddTask = async () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    if (editingTask) {
      await updateTask(editingTask.id, {
        ...newTask,
        id: editingTask.id,
        createdAt: editingTask.createdAt,
      });
    } else {
      await addTask(newTask);
    }

    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('medium');
    setEditingTask(null);
    setModalVisible(false);
    loadTasks();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskPriority(task.priority);
    setModalVisible(true);
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
    loadTasks();
  };

  const handleDeleteTask = (task) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            loadTasks();
          },
        },
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.primary;
    }
  };

  const TaskCard = ({ task }) => (
    <Card style={[styles.taskCard, shadows.small]}>
      <Card.Content>
        <View style={styles.taskHeader}>
          <View style={styles.taskInfo}>
            <Text 
              style={[
                styles.taskTitle,
                task.completed && styles.completedTask
              ]}
            >
              {task.title}
            </Text>
            <Chip 
              mode="outlined"
              style={[styles.priorityChip, { borderColor: getPriorityColor(task.priority) }]}
              textStyle={{ color: getPriorityColor(task.priority), fontSize: 12 }}
            >
              {task.priority.toUpperCase()}
            </Chip>
          </View>
          <View style={styles.taskActions}>
            <IconButton
              icon={task.completed ? "checkmark-circle" : "checkmark-circle-outline"}
              iconColor={task.completed ? theme.colors.success : theme.colors.outline}
              size={20}
              onPress={() => handleToggleComplete(task)}
            />
            <IconButton
              icon="pencil"
              iconColor={theme.colors.primary}
              size={20}
              onPress={() => handleEditTask(task)}
            />
            <IconButton
              icon="trash"
              iconColor={theme.colors.error}
              size={20}
              onPress={() => handleDeleteTask(task)}
            />
          </View>
        </View>
        {task.description ? (
          <Paragraph style={styles.taskDescription}>
            {task.description}
          </Paragraph>
        ) : null}
        <Text style={styles.taskDate}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChips}
        >
          <Chip
            mode={filter === 'all' ? 'flat' : 'outlined'}
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
            style={styles.filterChip}
          >
            All ({tasks.length})
          </Chip>
          <Chip
            mode={filter === 'pending' ? 'flat' : 'outlined'}
            selected={filter === 'pending'}
            onPress={() => setFilter('pending')}
            style={styles.filterChip}
          >
            Pending ({tasks.filter(t => !t.completed).length})
          </Chip>
          <Chip
            mode={filter === 'completed' ? 'flat' : 'outlined'}
            selected={filter === 'completed'}
            onPress={() => setFilter('completed')}
            style={styles.filterChip}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </Chip>
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.tasksList}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.length === 0 ? (
          <Surface style={styles.emptyState}>
            <Ionicons 
              name="checkmark-done-outline" 
              size={64} 
              color={theme.colors.outline} 
            />
            <Text style={styles.emptyStateTitle}>
              {filter === 'completed' ? 'No completed tasks' : 
               filter === 'pending' ? 'No pending tasks' : 'No tasks yet'}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {filter === 'all' || filter === 'pending' 
                ? 'Tap the + button to add your first task'
                : 'Complete some tasks to see them here'
              }
            </Text>
          </Surface>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          setEditingTask(null);
          setTaskTitle('');
          setTaskDescription('');
          setTaskPriority('medium');
          setModalVisible(true);
        }}
      />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </Text>
          
          <TextInput
            label="Task Title"
            value={taskTitle}
            onChangeText={setTaskTitle}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Description (Optional)"
            value={taskDescription}
            onChangeText={setTaskDescription}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
          />

          <Text style={styles.priorityLabel}>Priority</Text>
          <View style={styles.priorityContainer}>
            {['low', 'medium', 'high'].map((priority) => (
              <Chip
                key={priority}
                mode={taskPriority === priority ? 'flat' : 'outlined'}
                selected={taskPriority === priority}
                onPress={() => setTaskPriority(priority)}
                style={styles.priorityOption}
                selectedColor={getPriorityColor(priority)}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Chip>
            ))}
          </View>

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleAddTask}
              style={styles.modalButton}
              disabled={!taskTitle.trim()}
            >
              {editingTask ? 'Update' : 'Add'}
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  filterContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  filterChips: {
    paddingHorizontal: 20,
  },
  filterChip: {
    marginRight: 8,
  },
  tasksList: {
    flex: 1,
    padding: 20,
  },
  taskCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskInfo: {
    flex: 1,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: theme.colors.onSurfaceVariant,
  },
  priorityChip: {
    alignSelf: 'flex-start',
  },
  taskActions: {
    flexDirection: 'row',
  },
  taskDescription: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  taskDate: {
    fontSize: 12,
    color: theme.colors.outline,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    margin: 20,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: theme.colors.onSurface,
  },
  input: {
    marginBottom: 16,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  priorityOption: {
    marginRight: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 8,
  },
});

export default TasksScreen;