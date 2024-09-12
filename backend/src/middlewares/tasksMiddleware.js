// Validar o título da requisição feita pelo usuário
const validateTitle = (req, res, next) => {
    const { body } = req;

    if (body.title == undefined) {
        return res.status(400).json({ message: 'O campo "título" é obrigatório.' });
    }

    if (body.title == '') {
        return res.status(400).json({ message: 'O título precisa ser especificado.' });
    }

    next();
}

// Validar o status da requisição feita pelo usuário
const validateStatus = (req, res, next) => {
    const { body } = req;

    if (body.status === undefined) {
        return res.status(400).json({ message: 'O campo "status" é obrigatório.' });
    }

    if (body.status === '') {
        return res.status(400).json({ message: 'O status precisa ser especificado.' });
    }

    next();
}

module.exports = {
    validateTitle,
    validateStatus
};