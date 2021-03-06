const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body; 
  
  const repository = { id: uuid(), title, url, techs, likes: 0 };
   
  repositories.push(repository);
  
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs } = request.body;

  if(!isUuid(id)){
    return response.status(400).json({ error: 'Invalid repository ID.' });
  }

  const repository = repositories.find(repo => repo.id === id);

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({ error: 'Invalid repository ID.' });
  }

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  repositories.splice(repoIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({ error: 'Invalid repository ID.'});
  }

  const repository = repositories.find(repo => repo.id === id);

  repository.likes += 1;

  return response.send(repository);

});

module.exports = app;
