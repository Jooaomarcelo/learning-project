const addtaskForm = document.querySelector('.addTask-form');
const inputTask = document.querySelector('.input-task');
const btnSubmit = document.querySelector('.btn-submit');
const tbody = document.querySelector('tbody');

const getTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const tasks = await response.json();

  return tasks;
};

const addTask = async (e) => {
  e.preventDefault();

  const task = { title: inputTask.value };

  await fetch('http://localhost:3333/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  inputTask.value = '';
  loadTasks();
};

const updateTask = async (task) => {
  const { id, title, status } = task;

  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'delete',
  });

  loadTasks();
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };

  const newDate = new Date(dateUTC).toLocaleString('pt-br', options);

  return newDate;
};

const createSelect = (status) => {
  const options = `
    <option value="pendente">Pendente</option>
    <option value="em andamento">Em andamento</option>
    <option value="concluída">Concluída</option>
  `;

  const select = createElement('select', '', options);

  select.value = status;

  return select;
};

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

const createRow = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement('tr');

  const tdTitle = createElement('td', title);

  const tdDate = createElement('td', formatDate(created_at));

  const tdStatus = createElement('td', '');
  const select = createSelect(status);
  select.addEventListener('change', (e) => updateTask({ ...task, status: e.target.value }));

  const tdActions = createElement('td');
  const btnEdit = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const btnDelete = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

  // tdActions.classList.add('td-buttons');

  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener('submit', () => updateTask({ id, title: editInput.value, status }));

  btnEdit.classList.add('btn-actions');
  btnDelete.classList.add('btn-actions');

  btnEdit.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });
  btnDelete.addEventListener('click', () => deleteTask(id));

  tdStatus.appendChild(select);

  tdActions.appendChild(btnEdit);
  tdActions.appendChild(btnDelete);

  tr.appendChild(tdTitle);
  tr.appendChild(tdDate);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await getTasks();

  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

addtaskForm.addEventListener('submit', addTask);

loadTasks();
