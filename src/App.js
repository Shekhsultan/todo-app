import React, { useState } from 'react';
import styled from 'styled-components'; // Single import for styled-components
import { AddCircleOutline, DeleteOutline, CheckCircleOutline } from '@mui/icons-material';

// Styled components
// Main container
export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f8fc;
`;

export const TodoWrapper = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

// Header style
export const Header = styled.h1`
  text-align: center;
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
`;

// Input section
export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TodoInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #333;
  }
`;

export const AddButton = styled.button`
  background-color: #28a745;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

// Todo list styling
export const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  ${({ completed }) =>
    completed &&
    `
    span {
      color: #28a745;
      text-decoration: line-through;
    }
  `}
`;

export const Task = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;

  span {
    margin-right: 10px;
  }

  svg {
    margin-right: 10px;
    color: #6c757d;
  }
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #dc3545;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #c82333;
  }
`;

// Main React component
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Add new todo
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  // Toggle completion
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <AppContainer>
      <TodoWrapper>
        <Header>To-Do App</Header>
        <InputWrapper>
          <TodoInput
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your task..."
          />
          <AddButton onClick={handleAddTodo}>
            <AddCircleOutline fontSize="large" />
          </AddButton>
        </InputWrapper>
        <TodoList>
          {todos.map((todo) => (
            <TodoItem key={todo.id} completed={todo.completed}>
              <Task onClick={() => toggleComplete(todo.id)}>
                {todo.completed ? <CheckCircleOutline /> : <span />}
                {todo.text}
              </Task>
              <DeleteButton onClick={() => deleteTodo(todo.id)}>
                <DeleteOutline />
              </DeleteButton>
            </TodoItem>
          ))}
        </TodoList>
      </TodoWrapper>
    </AppContainer>
  );
};

export default App;
