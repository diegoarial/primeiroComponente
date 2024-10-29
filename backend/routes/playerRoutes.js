const express = require('express');
const router = express.Router();

let players = [];

router.get('/', (req, res) => {
    res.json(players);
});

router.post('/', (req, res) => {
    const { nome, idade, posicao, numeroCamisa, peDominante, numeroGols } = req.body;
    const newPlayer = { nome, idade, posicao, numeroCamisa, peDominante, numeroGols };
    players.push(newPlayer);
    res.status(201).json({ message: 'Jogador cadastrado com sucesso!', player: newPlayer });
});

router.delete('/:index', (req, res) => {
    const index = req.params.index;
    if (index < 0 || index >= players.length) {
        return res.status(404).json({ message: 'Jogador não encontrado.' });
    }
    const deletedPlayer = players.splice(index, 1);
    res.json({ message: 'Jogador deletado com sucesso!', player: deletedPlayer });
});

module.exports = router;
