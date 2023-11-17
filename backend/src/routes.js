const express = require('express');

const routes = express.Router();

const axios = require('axios');

const planets = []

routes.post('/planet', async (req, res) => {
    try {
        const data = req.body

        let url = `https://swapi.dev/api/planets/?search=${data.planet}`
        
        const response = await axios.get(url);

        if (response.data.results[0]) {
            planets.push(response.data.results[0]);
            return res.status(200).json({ message: 'Planeta adicionado com sucesso' });
        } else {
            console.log('Erro ao adicionar planeta');
            return res.status(404).json({ message: 'Nenhum planeta encontrado na resposta' });
        }
    } catch (error) {
    console.error('Erro ao chamar a outra rota:', error);
    return res.status(500).json({ message: 'Erro interno ao chamar a outra rota' });
    }
});

module.exports = routes;    