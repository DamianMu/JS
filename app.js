const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4');
const cors = require('cors');

const app = express()
const port = 4000

const db = require('./models')

// SERVER

var server = app.listen(port, () => console.log(`Aplication is on port:  ${port}!`))
app.use(bodyParser.json());
app.use(cors())
app.use(function(req, res, next) {
  // if (req.headers.authorization !== 'XYZ') {
    // return res.status(403).json({ error: 'Invalid or missing credentials!' });
  // }
  next();
});

const jsonParser = bodyParser.json()

// Add a task

app.post('/tasks', jsonParser, (req, res) => {
  const { firstName, lastName, email, content } = req.body
  return db.Task.create({ firstName, lastName, email, content})
    .then((task) => res.send({ firstName, lastName, email, content, id:task.id }))
    .catch((err) => {
      console.log('Sorry, cannot create a task :(', JSON.stringify(Task))
      return res.status(400).send(err)
    })
})

// Get all tasks

app.get('/tasks', function (req, res) {
  return db.Task.findAll()
    .then((tasks) => res.send(tasks))
    .catch((err) => {
      console.log('Sorry, theres no tasks :(', JSON.stringify(err))
      return res.send(err)
    })
})

// Update a task

app.put('/tasks/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.Task.findByPk(id)
  .then((task) => {
    if ( task === null ) {
      return res.status(400).send("Sorry, no task :(")
    }
    const { firstName, lastName, email, content } = req.body
    return task.update({ firstName, lastName, email, content })
      .then(() => res.send(task))
      .catch((err) => {
        console.log('Sorry, cannot update a task :(', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})

// Delete a task

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Task.findByPk(id)
    .then((task) => task.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('Sorry, cannot delete a task :(', JSON.stringify(err))
      res.status(400).send(err)
    })
})

app.get('/categories', function (req, res) {
  return db.Category.findAll()
    .then((categories) => res.send(categories))
    .catch((err) => {
      console.log('Sorry, no categories', JSON.stringify(err))
      return res.send(err)
    })
})

app.post('/categories', jsonParser, (req, res) => {
  const { name } = req.body
  return db.Category.create({ name })
    .then((category) => res.send(category))
    .catch((err) => {
      console.log('Oooops! Can not create a category!', JSON.stringify(movie))
      return res.status(400).send(err)
    })
})

app.put('/tasks/:id/addCategory', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.Task.findByPk(id)
  .then((task) => {
    if ( task === null ) {
      return res.status(400).send("Ooops! No movie!")
    }
    const { categoryId } = req.body
    return db.Category.findByPk(categoryId)
      .then((category) => task.addCategory(category)) /* #### */
      .then(() => res.send({ categoryId }))
      .catch((err) => {
        console.log('Oooops! Can not delete a movie', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})

app.get('/tasks/:id/categories', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.task.findByPk(id)
  .then((task) => {
    if ( task === null ) {
      return res.status(400).send("Sorry, no task")
    }

    return task.getCategories()
      .then((categories) => res.send(categories))
      .catch((err) => {
        console.log('Sorry, cannot add task to category', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})

module.exports = server;
