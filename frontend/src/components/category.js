import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class Category_component extends Component {
    state = {
        category: [],
        newcategoryData: {
          name: ''
        },
        editcategoryData: {
            name: ''
        },
        newcategoryModal: false,
        editcategoryModal: false
      }
      componentWillMount() {
        this._refreshcategorys();
      }
      toggleNewcategoryModal() {
        this.setState({
          newcategoryModal: ! this.state.newcategoryModal
        });
      }
      toggleEditcategoryModal() {
        this.setState({
          editcategoryModal: ! this.state.editcategoryModal
        });
      }
      addcategory() {
        axios.post('http://localhost:4000/categories', this.state.newcategoryData).then((response) => {
          let { category } = this.state;
    
          category.push(response.data);
    
          this.setState({ category, newcategoryModal: false, newcategoryData: {
            name: ''
          }});
        });
      }
      updatecategory() {
        let { name } = this.state.editcategoryData;
    
        axios.put('http://localhost:4000/categories/' + this.state.editcategoryData.id, {
            name
        }).then((response) => {
          this._refreshcategorys();

          this.setState({
            editcategoryModal: false, editcategoryData: { id: '', name: " " }
          })
        });
      }
      editcategory(id, name) {
        this.setState({
          editcategoryData: { id, name }, editcategoryModal: ! this.state.editcategoryModal
        });
      }
      deletecategory(id) {
        axios.delete('http://localhost:4000/categories/' + id).then((response) => {
          this._refreshcategorys();
        });
      }
      _refreshcategorys() {
        axios.get('http://localhost:4000/categories').then((response) => {
          this.setState({
            category: response.data
          })
        });
      }
      render() {
        let category = this.state.category.map((category) => {
          return (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editcategory.bind(this, category.id, category.name)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deletecategory.bind(this, category.id)}>Delete</Button>
              </td>
            </tr>
          )
        });
        return (
          <div className="App container">
    
          <Button className="my-3" color="primary" onClick={this.toggleNewcategoryModal.bind(this)}>Add category</Button>
    
          <Modal isOpen={this.state.newcategoryModal} toggle={this.toggleNewcategoryModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewcategoryModal.bind(this)}>Add a new category</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Category name</Label>
                <Input id="name" value={this.state.newcategoryData.name} onChange={(e) => {
                  let { newcategoryData } = this.state;
    
                  newcategoryData.name = e.target.value;
    
                  this.setState({ newcategoryData });
                }} />
              </FormGroup>
                </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addcategory.bind(this)}>Add category</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewcategoryModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.editcategoryModal} toggle={this.toggleEditcategoryModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditcategoryModal.bind(this)}>Edit category</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Category Name</Label>
                <Input id="name" value={this.state.editcategoryData.name} onChange={(e) => {
                  let { editcategoryData } = this.state;
    
                  editcategoryData.name = e.target.value;
    
                  this.setState({ editcategoryData });
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updatecategory.bind(this)}>Update category</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditcategoryModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category name</th>
                  </tr>
                </thead>
                <tbody>
                  {category}
                </tbody>
              </Table>
            </div>
          );
        }
}



export default Category_component