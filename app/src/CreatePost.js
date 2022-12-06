import React, { useState } from 'react';
import { css } from '@emotion/css';
import Button from './Button';
import { v4 as uuid } from 'uuid';
import { Storage, API, Auth } from 'aws-amplify';
import { createTemplate } from './graphql/mutations';

/* Initial state to hold form input, saving state */
const initialState = {
  name: '',
  description: '',
  image: {},
  file: '',
  saving: false,
  error:false
};

export default function CreatePost({
  updateOverlayVisibility, updatePosts, posts
}) {

  /* 1. Create local state with useState hook */
  const [formState, updateFormState] = useState(initialState)

  /* 2. onChangeText handler updates the form state when a user types into a form field */
  function onChangeText(e) {
    e.persist();
    updateFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
  }

  /* 3. onChangeFile handler will be fired when a user uploads a file  */
  function onChangeFile(e) {
    e.persist();
    if (! e.target.files[0]) {
      updateFormState(currentState => ({ ...currentState, saving: true }))
      return
    };
    const fileExtPosition = e.target.files[0].name.search(/.png|.jpg|.gif/i);
    const firstHalf = e.target.files[0].name.slice(0, fileExtPosition);
    const secondHalf = e.target.files[0].name.slice(fileExtPosition);
    const fileName = firstHalf + "_" + uuid() + secondHalf;
    console.log(fileName);
    const image = { fileInfo: e.target.files[0], name: fileName};
    updateFormState(currentState => ({ ...currentState, file: URL.createObjectURL(e.target.files[0]), image }))
  }

  /* 4. Save the post  */
  async function save() {
    try {
      const { name, description,  image } = formState;
      if (!name || !description  || !image.name) {
        updateFormState(currentState => ({ ...currentState, error: true }))
        return
      } ;
      updateFormState(currentState => ({ ...currentState, saving: true }));
      const postId = uuid();
      const postInfo = { name, description,  image: formState.image.name, id: postId };

      await Storage.put(formState.image.name, formState.image.fileInfo);
      await API.graphql({
        query: createTemplate, variables: { input: postInfo }
      });
      updatePosts([...posts, { ...postInfo, image: formState.file }]);
      updateFormState(currentState => ({ ...currentState, saving: false }));
      updateOverlayVisibility(false);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <div className={containerStyle}>
      <h4 className={boxTitle}>Add frame for photobooth</h4>
      { formState.saving && <p className={savingMessageStyle}>Saving post...</p> }
      { formState.error && <p className={errorMessageStyle}>There was an error while saving; please enter the name, description, and image.</p> }
      <input
        placeholder="Template name"
        name="name"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Description"
        name="description"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input 
        type="file"
        onChange={onChangeFile}
      />
      { formState.file && <img className={imageStyle} alt="preview" src={formState.file} /> }
      <Button title="Add" onClick={save} />
      <Button type="cancel" title="Cancel" onClick={() => updateOverlayVisibility(false)} />
    
    </div>
  )
}

const inputStyle = css`
  margin-bottom: 10px;
  outline: none;
  padding: 7px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
`

const imageStyle = css`
  height: 120px;
  margin: 10px 0px;
  object-fit: contain;
`

const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 420px;
  position: fixed;
  left: 0;
  border-radius: 4px;
  top: 0;
  margin-left: calc(50vw - 220px);
  margin-top: calc(50vh - 230px);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
  padding: 20px;
`

const savingMessageStyle = css`
  margin-bottom: 0px;
`

const errorMessageStyle = css`
color: red;
margin-bottom: 15px;
`
const boxTitle = css`
text-align: CENTER;
background: #ccc;
padding: 10px;
`
 