
window.addEventListener('DOMContentLoaded', () => {
	class Todo {
		constructor(form, input, todoList, todoCompleted) {
			// создаём свойства
			// this.container = document.querySelector(container);
			this.form = document.querySelector(form);
			this.input = document.querySelector(input);
			this.todoList = document.querySelector(todoList);
			this.todoCompleted = document.querySelector(todoCompleted);
			// колекция, куда добавляются все дела
			this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
		}
		// добавляет дела в localStorage
		addToStorage() {
			localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
		}
		// метод render(),h
		render() {
			this.todoList.textContent = '';  // чистим поля
			this.todoCompleted.textContent = '';  // чистим поля
			// перебирает все дела ,которые записаны в todoData чере forEac
			this.todoData.forEach(this.createItem, this);
			// this.addToStorage();
		}
		createItem(todo) {
			// создаём элемент
			const li = document.createElement('li');
			li.classList.add('todo-item'); // добавляем класс
			li.key = todo.key;
			// добавляем вёрстку
			li.insertAdjacentHTML('beforeend', `
                <span class="text-todo">${todo.value}</span>
                <div class="todo-buttons">
                    <button class="todo-edit"></button>
                    <button class="todo-remove"></button>
                    <button class="todo-complete"></button>
                </div>
            `);
			// условие куда добавляется
			if (todo.completed) {
				this.todoCompleted.append(li);
			} else {
				this.todoList.append(li);
			}
		}
		// метод
		// получаем данные из input и создаём объект в котором будем добавлять addTodo
		addTodo(event) {
			event.preventDefault();
			// проверяем, что input непустой,и используем trim(), чтобы убрать пробелы
			if (this.input.value.trim()) {
				// создаём дело newTodo
				const newTodo = {
					value: this.input.value, // текст, который будем получать из объекта input
					completed: false, // свойство, которое определяет выполнено дело или нет
					key: this.generateKey(), // ключ, добавляем generateKey(), чтобы всегда был уникальным
				};
				// добавляем новое дело
				this.todoData.set(newTodo.key, newTodo);
				this.render();
				this.addToStorage();
				this.input.value = '';
			} else {
				alert('Поле ввода не должно быть пустым.');
			}
		}
		// генерируем ключ
		generateKey() {
			return Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15);
		}
		// вызов метода
		deleteItem(btn) {
			this.todoData.delete(btn.parentElement.parentElement.key);
			this.render();
		}
		//
		completedItem(btn) {
			const item = this.todoData.get(btn.parentElement.parentElement.key);
			item.completed = !item.completed;
			this.render();
		}
		// метод определяет на какую кнопку кликнули
		handler() {
			//находим родитель, навешиваем событие click
			document.querySelector('.todo-container').addEventListener('click', event => {
				if (event.target.classList.contains('todo-remove')) {
					this.deleteItem(event.target);
				}
				if (event.target.classList.contains('todo-complete')) {
					this.completedItem(event.target);
				}
			});
		}
		// метод
		init() {
			this.form.addEventListener('submit', this.addTodo.bind(this));
			this.render();
			this.handler();
		}
	}
	const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
	todo.init();
});
