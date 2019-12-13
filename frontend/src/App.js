import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {
  state = {
    clients: [],
    newclientData: {
      firstName: '',
      lastName: '',
      email: '',
      product: '',
      productCost: ''
    },
    editclientData: {
        firstName: '',
        lastName: '',
        email: '',
        product: '',
        productCost: ''
    },
    newclientModal: false,
    editclientModal: false
  }
  componentWillMount() {
    this._refreshclients();
  }
  toggleNewclientModal() {
    this.setState({
      newclientModal: ! this.state.newclientModal
    });
  }
  toggleEditclientModal() {
    this.setState({
      editclientModal: ! this.state.editclientModal
    });
  }
  addclient() {
    axios.post('http://localhost:4000/clients', this.state.newclientData).then((response) => {
      let { clients } = this.state;

      clients.push(response.data);

      this.setState({ clients, newclientModal: false, newclientData: {
        firstName: '',
        lastName: '',
        email: '',
        product: '',
        productCost: ''
      }});
    });
  }
  updateclient() {
    let { firstName, lastName, email, product, productCost } = this.state.editclientData;

    axios.put('http://localhost:4000/clients/' + this.state.editclientData.id, {
      firstName, lastName, email, product, productCost
    }).then((response) => {
      this._refreshclients();

      this.setState({
        editclientModal: false, editclientData: { id: '', firstName: '', lastName: '',email: '',product: '',productCost: '' }
      })
    });
  }
  editclient(id, firstName, lastName, email, product, productCost) {
    this.setState({
      editclientData: { id, firstName, lastName, email, product, productCost }, editclientModal: ! this.state.editclientModal
    });
  }
  deleteclient(id) {
    axios.delete('http://localhost:4000/clients/' + id).then((response) => {
      this._refreshclients();
    });
  }
  _refreshclients() {
    axios.get('http://localhost:4000/clients').then((response) => {
      this.setState({
        clients: response.data
      })
    });
  }
  render() {
    let clients = this.state.clients.map((client) => {
      return (
        <tr key={client.id}>
          <td>{client.id}</td>
          <td>{client.firstName}</td>
          <td>{client.lastName}</td>
          <td>{client.email}</td>
          <td>{client.product}</td>
          <td>{client.productCost}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editclient.bind(this, client.id, client.firstName, client.lastName)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteclient.bind(this, client.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>clients App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewclientModal.bind(this)}>Add client</Button>

      <Modal isOpen={this.state.newclientModal} toggle={this.toggleNewclientModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewclientModal.bind(this)}>Add a new client</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input id="firstName" value={this.state.newclientData.client} onChange={(e) => {
              let { newclientData } = this.state;

              newclientData.firstName = e.target.value;

              this.setState({ newclientData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input id="lastName" value={this.state.newclientData.lastName} onChange={(e) => {
              let { newclientData } = this.state;

              newclientData.lastName = e.target.value;

              this.setState({ newclientData });           
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input id="email" value={this.state.newclientData.email} onChange={(e) => {
              let { newclientData } = this.state;

              newclientData.email = e.target.value;

              this.setState({ newclientData });           
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="product">Product</Label>
            <Input id="product" value={this.state.newclientData.product} onChange={(e) => {
              let { newclientData } = this.state;

              newclientData.product = e.target.value;

              this.setState({ newclientData });           
            }} />
            </FormGroup>
            <FormGroup>
            <Label for="productCost">Price</Label>
            <Input id="productCost" value={this.state.newclientData.productCost} onChange={(e) => {
              let { newclientData } = this.state;

              newclientData.productCost = e.target.value;

              this.setState({ newclientData });           
            }} />
            </FormGroup>
            </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addclient.bind(this)}>Add client</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewclientModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editclientModal} toggle={this.toggleEditclientModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditclientModal.bind(this)}>Edit a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editclientData.title} onChange={(e) => {
              let { editclientData } = this.state;

              editclientData.title = e.target.value;

              this.setState({ editclientData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">lastName</Label>
            <Input id="rating" value={this.state.editclientData.rating} onChange={(e) => {
              let { editclientData } = this.state;

              editclientData.rating = e.target.value;

              this.setState({ editclientData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateclient.bind(this)}>Update client</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditclientModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail</th>
              <th>Product</th>
              <th>ProductCost</th>
            </tr>
          </thead>

          <tbody>
            {clients}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
