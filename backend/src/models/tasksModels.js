// Funções que interagem com o banco de dados
const connection = require('./connection');

// Função assíncrona para realizar toda a coleta dos dados
const getAll = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks'); // Espera a conclusão da função (somente funções assíncronas permitem essa funcionalidade)
    
    return tasks; // Retorna o array [tasks, buffer]
};

// Função assíncrona para realizar a inserção de uma tarefa na tabela do BD
const addTask = async (task) => {
    const {title} = task;

    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

    // Pegando data atual
    const dateUTC = new Date(Date.now()).toUTCString();

    const [addedTask] = await connection.execute(query, [title, 'pendente', dateUTC]);

    return {insertId: addedTask.insertId};
};

// Função assíncrona para realizar a remoção de uma tarefa na tabela do BD
const deleteTask = async (id) => {
    const deletedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);

    return deletedTask;
}

// Função assíncrona para realizar a atualização de uma tarefa na tabela do BD
const updateTask = async (id, task) => {
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

    const updatedTask = await connection.execute(query, [task.title, task.status, id]);

    return updatedTask;
}

module.exports = {
    getAll,
    addTask,
    deleteTask,
    updateTask
};