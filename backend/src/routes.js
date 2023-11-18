const express = require('express');

const routes = express.Router();

const axios = require('axios');

const planets = []

routes.post('/planet', async (req, res) => {
    try {

        const data = req.body
        const existingPlanet = planets.find(planet => planet.name === data.planet);
        
        if (data.planet == '') {
            return res.status(400).json({ message: 'Planeta inválido'} )
        }

        if (existingPlanet) {
            return res.status(400).json({ message: 'Planeta já existe na lista' });
        }

        let url = `https://swapi.dev/api/planets/?search=${data.planet}`
        console.log(data.planet)
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

routes.get('/planets', (req, res) => {

    res.status(200).json(planets);
});

routes.get('/planet/:name', (req, res) => {
    const planetName = req.params.name;
  
    if (!planetName) {
      return res.status(400).json({ error: 'Nome do planeta não fornecido' });
    }
  
    const planet = planets.find(planet => planet.name === planetName);
  
    if (!planet) {
      return res.status(404).json({ error: 'Planeta não encontrado' });
    }
  
    res.status(200).json(planet);
});

routes.delete('/planet/:name', (req, res) => {
        const planetName = req.params.name;
    
        if (!planetName) {
            return res.status(400).json({ error: 'Nome do planeta não fornecido' });
        }
    
        const planetIndex = planets.findIndex(planet => planet.name === planetName);
    
        if (planetIndex === -1) {
            return res.status(404).json({ error: 'Planeta não encontrado' });
        }
    
        // Remova o planeta do array
        planets.splice(planetIndex, 1);
    
        res.status(200).json({ message: 'Planeta removido com sucesso' });
});

module.exports = routes;    