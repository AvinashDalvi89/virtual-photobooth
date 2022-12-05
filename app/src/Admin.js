import React, { useState, useEffect } from "react";
import {
    HashRouter,
    Switch,
    Route
} from "react-router-dom";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { css } from '@emotion/css';
import { API, Storage, Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { listTemplates } from './graphql/queries';

import Posts from './Posts';
import CreatePost from './CreatePost';
import Button from './Button';
import './index.css'

function Admin({ user, signOut }) {

    /* create a couple of pieces of initial state */
    const [showOverlay, updateOverlayVisibility] = useState(false);
    const [posts, updatePosts] = useState([]);

    /* fetch posts when component loads */
    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {

        /* query the API, ask for 100 items */
        let postData = await API.graphql({ query: listTemplates, variables: { limit: 100 } });
        let postsArray = postData.data.listTemplates.items;

        /* map over the image keys in the posts array, get signed image URLs for each image */
        postsArray = await Promise.all(postsArray.map(async post => {
            const imageKey = await Storage.get(post.image);
            console.log(imageKey)
            post.image = imageKey;
            return post;
        }));

        /* update the posts array in the local state */
        setPostState(postsArray);
    }

    async function setPostState(postsArray) {
        updatePosts(postsArray);
    }

    return (
        <>
            <div className={contentStyle}>
                <Button className="button" title="New Post" onClick={() => updateOverlayVisibility(true)} />
                <Posts posts={posts} />
            </div>
            {showOverlay && (
                <CreatePost
                    updateOverlayVisibility={updateOverlayVisibility}
                    updatePosts={setPostState}
                    posts={posts}
                />
            )}
        </>
    );
}

const dividerStyle = css`
  margin-top: 15px;
`

const contentStyle = css`
  min-height: calc(100vh - 45px);
  padding: 0px 40px;
`

export default withAuthenticator(Admin);