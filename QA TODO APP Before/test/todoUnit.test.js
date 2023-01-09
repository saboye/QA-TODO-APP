const expect = require('chai').expect;

describe('Todo list functionality', () => {
    let form, todoInput, todoList;
    beforeEach(() => {
      form = document.getElementById('form');
      todoInput = document.getElementById('todo-input');
      todoList = document.getElementById('todo-list');
    });
  
    it('should add a todo to the list and clear the input field', () => {
      todoInput.value = 'Learn unit testing';
      form.dispatchEvent(new Event('submit'));
      expect(todoList.lastChild.textContent).toEqual('Learn unit testing');
      expect(todoInput.value).toEqual('');
    });
  
    it('should not add an empty todo to the list', () => {
      todoInput.value = '';
      form.dispatchEvent(new Event('submit'));
      expect(todoList.childNodes.length).toEqual(0);
    });
  
    it('should add a todo to local storage', () => {
      todoInput.value = 'Learn unit testing';
      form.dispatchEvent(new Event('submit'));
      expect(JSON.parse(localStorage.getItem('todos'))).toEqual(['Learn unit testing']);
    });
  
    it('should remove a todo from the list', () => {
      todoInput.value = 'Learn unit testing';
      form.dispatchEvent(new Event('submit'));
      const deleteButton = todoList.querySelector('.delete-button');
      deleteButton.dispatchEvent(new Event('click'));
      expect(todoList.childNodes.length).toEqual(0);
    });
  
    it('should remove a todo from local storage', () => {
      todoInput.value = 'Learn unit testing';
      form.dispatchEvent(new Event('submit'));
      const deleteButton = todoList.querySelector('.delete-button');
      deleteButton.dispatchEvent(new Event('click'));
      expect(JSON.parse(localStorage.getItem('todos'))).toEqual([]);
    });
  
    it('should display todos from local storage', () => {
      localStorage.setItem('todos', JSON.stringify(['Learn unit testing']));
      displayTodosFromLocalStorage();
      expect(todoList.lastChild.textContent).toEqual('Learn unit testing');
    });
  });
  