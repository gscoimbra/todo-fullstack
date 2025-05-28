const API_URL = 'http://localhost:3001/tasks';

const list = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

// Carregar tarefas ao iniciar
window.onload = loadTasks;

async function loadTasks() {
  list.innerHTML = '';
  const res = await fetch(API_URL);
  const tasks = await res.json();
  tasks.forEach(addTaskToDOM);
}

// Adicionar tarefa
form.onsubmit = async (e) => {
  e.preventDefault();
  const description = input.value.trim();
  if (!description) return;
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ description })
  });
  const task = await res.json();
  addTaskToDOM(task);
  input.value = '';
};

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = task.done ? 'done' : '';
  li.innerHTML = `
    <span onclick="toggleDone(${task.id}, ${!task.done})" style="cursor:pointer;">
      ${task.description}
    </span>
    <div>
      <button onclick="deleteTask(${task.id})">Excluir</button>
      <button onclick="toggleDone(${task.id}, ${!task.done})">${task.done ? 'Desfazer' : 'Feito'}</button>
    </div>
  `;
  li.id = 'task-' + task.id;
  list.appendChild(li);
}

// Marcar como feito/não feito
window.toggleDone = async (id, done) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ done })
  });
  // Recarrega a lista completa após atualizar
  loadTasks();
};

// Deletar tarefa
window.deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  document.getElementById('task-' + id).remove();
};
