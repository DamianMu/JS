import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {
  state = {
    tasks: [],
    newTaskData: {
      firstName: '',
      lastName: '',
      email: '',
      content: ''
    },
    editTaskData: {
        firstName: '',
        lastName: '',
        email: '',
        content: ''
    },
    newTaskModal: false,
    editTaskModal: false
  }
  componentWillMount() {
    this._refreshTasks();
  }
  toggleNewTaskModal() {
    this.setState({
      newTaskModal: ! this.state.newTaskModal
    });
  }
  toggleEditTaskModal() {
    this.setState({
      editTaskModal: ! this.state.editTaskModal
    });
  }
  addTask() {
    axios.post('http://localhost:4000/tasks', this.state.newTaskData).then((response) => {
      let { tasks } = this.state;

      tasks.push(response.data);

      this.setState({ tasks, newTaskModal: false, newTaskData: {
        firstName: '',
        lastName: '',
        email: '',
        content: ''
      }});
    });
  }
  updateTask() {
    let { firstName, lastName, email, content } = this.state.editTaskData;

    axios.put('http://localhost:4000/tasks/' + this.state.editTaskData.id, {
      firstName, lastName, email, content
    }).then((response) => {
      this._refreshTasks();

      this.setState({
        editTaskModal: false, editTaskData: { id: '', firstName: '', lastName: '',email: '',content: '' }
      })
    });
  }
  editTask(id, firstName, lastName, email, content) {
    this.setState({
      editTaskData: { id, firstName, lastName, email, content }, editTaskModal: ! this.state.editTaskModal
    });
  }
  deleteTask(id) {
    axios.delete('http://localhost:4000/tasks/' + id).then((response) => {
      this._refreshTasks();
    });
  }
  _refreshTasks() {
    axios.get('http://localhost:4000/tasks').then((response) => {
      this.setState({
        tasks: response.data
      })
    });
  }
  render() {
    let tasks = this.state.tasks.map((task) => {
      return (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.firstName}</td>
          <td>{task.lastName}</td>
          <td>{task.email}</td>
          <td>{task.content}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editTask.bind(this, task.id, task.firstName, task.lastName)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Tasks App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewTaskModal.bind(this)}>Add Task</Button>

      <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add a new task</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input id="firstName" value={this.state.newTaskData.task} onChange={(e) => {
              let { newTaskData } = this.state;

              newTaskData.firstName = e.target.value;

              this.setState({ newTaskData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input id="lastName" value={this.state.newTaskData.lastName} onChange={(e) => {
              let { newTaskData } = this.state;

              newTaskData.lastName = e.target.value;

              this.setState({ newTaskData });           
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input id="email" value={this.state.newTaskData.email} onChange={(e) => {
              let { newTaskData } = this.state;

              newTaskData.email = e.target.value;

              this.setState({ newTaskData });           
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="content">Content</Label>
            <Input id="content" value={this.state.newTaskData.content} onChange={(e) => {
              let { newTaskData } = this.state;

              newTaskData.content = e.target.value;

              this.setState({ newTaskData });           
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Edit a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editTaskData.title} onChange={(e) => {
              let { editTaskData } = this.state;

              editTaskData.title = e.target.value;

              this.setState({ editTaskData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">lastName</Label>
            <Input id="rating" value={this.state.editTaskData.rating} onChange={(e) => {
              let { editTaskData } = this.state;

              editTaskData.rating = e.target.value;

              this.setState({ editTaskData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateTask.bind(this)}>Update Task</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail</th>
              <th>Content</th>
            </tr>
          </thead>

          <tbody>
            {tasks}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
