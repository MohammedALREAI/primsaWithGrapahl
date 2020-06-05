import React, { Component,useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import { useMutation } from '@apollo/react-hooks';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const  CreateItem=()=> {
     const initialState={
          title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
     }
     const [state, setState] = useState(initialState)

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setState({ [name]: val });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/wesbostutorial/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };
     const [createItem, {  loading, error  }] = useMutation(CREATE_ITEM_MUTATION);

    return (
          <Form
            data-test="form"
            onSubmit={async e => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createItem({variables:{state}});
              // change them to the single item page
              console.log(res);
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={uploadFile()}
                />
                {state.image && (
                  <img width="200" src={state.image} alt="Upload Preview" />
                )}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={state.title}
                  onChange={handleChange()}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={state.price}
                  onChange={handleChange()}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  required
                  value={state.description}
                  onChange={handleChange()}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}




export default CreateItem;
export { CREATE_ITEM_MUTATION };
