const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4');
const cors = require('cors');
const albumsQueue = require('./queues/albumsQueue')

const app = express()
const port = 4000

const db = require('./models');
const ticket = require('./models/ticket');

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

// Add a engineer

app.post('/engineers', jsonParser, (req, res) => {
  const { firstName, lastName, email} = req.body
  return db.engineer.create({ firstName, lastName, email})
    .then((engineer) => res.send({ firstName, lastName, email, id:engineer.id }))
    .catch((err) => {
      console.log('Sorry, cannot create a engineer :(', JSON.stringify(err))
      return res.status(400).send(err)
    })
})

// Get all engineers

app.get('/engineers', function (req, res) {
  return db.engineer.findAll()
    .then((engineers) => res.send(engineers))
    .catch((err) => {
      console.log('Sorry, theres no engineers :(', JSON.stringify(err))
      return res.send(err)
    })
})

// Update a engineer

app.put('/engineers/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.engineer.findByPk(id)
  .then((engineer) => {
    if ( engineer === null ) {
      return res.status(400).send("Sorry, no engineer :(")
    }
    const { firstName, lastName, email} = req.body
    return engineer.update({ firstName, lastName, email})
      .then(() => res.send(engineer))
      .catch((err) => {
        console.log('Sorry, cannot update a engineer :(', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})

// Delete a engineer

app.delete('/engineers/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.engineer.findByPk(id)
    .then((engineer) => engineer.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('Sorry, cannot delete a engineer :(', JSON.stringify(err))
      res.status(400).send(err)
    })
})



// Get all tickets

app.get('/tickets', function (req, res) {
  return db.ticket.findAll()
    .then((tickets) => res.send(tickets))
    .catch((err) => {
      console.log('Sorry, theres no tickets :(', JSON.stringify(err))
      return res.send(err)
    })
})

// Add a ticket

app.post('/tickets', jsonParser, (req, res) => {
  const { subject, description, category_id, status_id, priority_id, user_id, resource_id, engeener_id } = req.body
  return db.ticket.create({ subject, description, category_id, status_id, priority_id, user_id, resource_id, engeener_id})
    .then((ticket) => res.send({ subject, description, category_id, status_id, priority_id, user_id, resource_id, engeener_id, id:ticket.id }))
    .catch((err) => {
      console.log('Sorry, cannot create a ticket :(', JSON.stringify(err))
      return res.status(400).send(err)
    })
})

// Update ticket

app.put('/tickets/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.ticket.findByPk(id)
  .then((ticket) => {
    if ( ticket === null ) {
      return res.status(400).send("Sorry, no tickets :(")
    }
    const { subject, description, category_id, status_id, priority_id, user_id, resource_id, engeener_id } = req.body
    return ticket.update({ subject, description, category_id, status_id, priority_id, user_id, resource_id, engeener_id })
      .then(() => res.send(ticket))
      .catch((err) => {
        console.log('Sorry, cannot update a ticket :(', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})



// Delete a ticket

app.delete('/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.ticket.findByPk(id)
    .then((ticket) => ticket.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('Sorry, cannot delete a ticket :(', JSON.stringify(err))
      res.status(400).send(err)
    })
})

app.get('/types', function (req, res) {
  return db.type.findAll()
    .then((types) => res.send(types))
    .catch((err) => {
      console.log('Sorry, no types', JSON.stringify(err))
      return res.send(err)
    })
})

// Add a user

app.post('/users', jsonParser, (req, res) => {
  const { firstName, lastName, email, resource_id } = req.body
  return db.user.create({ firstName, lastName, email, resource_id})
    .then((user) => res.send({ firstName, lastName, email, resource_id, id:user.id }))
    .catch((err) => {
      console.log('Sorry, cannot create a user :(', JSON.stringify(err))
      return res.status(400).send(err)
    })
})

// Get all users

app.get('/users', function (req, res) {
  return db.user.findAll()
    .then((users) => res.send(users))
    .catch((err) => {
      console.log('Sorry, theres no users :(', JSON.stringify(err))
      return res.send(err)
    })
})

// Update a user

app.put('/users/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.user.findByPk(id)
  .then((user) => {
    if ( user === null ) {
      return res.status(400).send("Sorry, no user :(")
    }
    const { firstName, lastName, email, resource_id } = req.body
    return user.update({ firstName, lastName, email, resource_id })
      .then(() => res.send(user))
      .catch((err) => {
        console.log('Sorry, cannot update a user :(', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})

// Delete a user

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.user.findByPk(id)
    .then((user) => user.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('Sorry, cannot delete a user :(', JSON.stringify(err))
      res.status(400).send(err)
    })
})

// Add a priority

app.post('/priorities', jsonParser, (req, res) => {
  const { name } = req.body
  return db.priority.create({ name})
    .then((priority) => res.send({ name, id:priority.id }))
    .catch((err) => {
      console.log('Sorry, cannot create a user :(', JSON.stringify(err))
      return res.status(400).send(err)
    })
})
// Get all priorities

app.get('/priorities', function (req, res) {
  return db.priority.findAll()
    .then((priority) => res.send(priority))
    .catch((err) => {
      console.log('Sorry, theres no users :(', JSON.stringify(err))
      return res.send(err)
    })
})

// Update a priorities

app.put('/priorities/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.priority.findByPk(id)
  .then((priority) => {
    if ( priority === null ) {
      return res.status(400).send("Sorry, no user :(")
    }
    const { name } = req.body
    return priority.update({ name })
      .then(() => res.send(priority))
      .catch((err) => {
        console.log('Sorry, cannot update a user :(', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})

// Delete a priority

app.delete('/priorities/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.priority.findByPk(id)
    .then((priority) => priority.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('Sorry, cannot delete a user :(', JSON.stringify(err))
      res.status(400).send(err)
    })
})

// Add a status

app.post('/statuses', jsonParser, (req, res) => {
  const { name } = req.body
  return db.status.create({ name})
    .then((status) => res.send({ name, id:status.id }))
    .catch((err) => {
      console.log('Sorry, cannot create a user :(', JSON.stringify(err))
      return res.status(400).send(err)
    })
})
// Get all statuses

app.get('/statuses', function (req, res) {
  return db.status.findAll()
    .then((status) => res.send(status))
    .catch((err) => {
      console.log('Sorry, theres no users :(', JSON.stringify(err))
      return res.send(err)
    })
})

// Update a status

app.put('/statuses/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.status.findByPk(id)
  .then((status) => {
    if ( status === null ) {
      return res.status(400).send("Sorry, no user :(")
    }
    const { name } = req.body
    return status.update({ name })
      .then(() => res.send(status))
      .catch((err) => {
        console.log('Sorry, cannot update a user :(', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})

// Delete a status

app.delete('/statuses/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.status.findByPk(id)
    .then((status) => status.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('Sorry, cannot delete a user :(', JSON.stringify(err))
      res.status(400).send(err)
    })
})

// Add a resource

app.post('/resources', jsonParser, (req, res) => {
  const { name, ip, mac, user_id } = req.body
  return db.Resource.create({name, ip, mac, user_id})
    .then((Resource) => res.send({ name, ip, mac, user_id, id:Resource.id }))
    .catch((err) => {
      console.log('Sorry, cannot create a user :(', JSON.stringify(err))
      return res.status(400).send(err)
    })
})

// Get all resources

app.get('/resources', function (req, res) {
  return db.Resource.findAll()
    .then((Resource) => res.send(Resource))
    .catch((err) => {
      console.log('Sorry, theres no users :(', JSON.stringify(err))
      return res.send(err)
    })
})

// Update a resource

app.put('/resources/:id', jsonParser, (req, res) => {
  const id = parseInt(req.params.id)
  return db.Resource.findByPk(id)
  .then((Resource) => {
    if ( Resource === null ) {
      return res.status(400).send("Sorry, no user :(")
    }
    const { name, ip, mac, user_id } = req.body
    return Resource.update({ name, ip, mac, user_id })
      .then(() => res.send(Resource))
      .catch((err) => {
        console.log('Sorry, cannot update a user :(', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
})

// Delete a resource

app.delete('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Resource.findByPk(id)
    .then((Resource) => Resource.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('Sorry, cannot delete a user :(', JSON.stringify(err))
      res.status(400).send(err)
    })
})

module.exports = server;
