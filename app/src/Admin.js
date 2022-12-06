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
import VPlogo from './assets/images/VPlogo.png';
import loginuser from './assets/images/loginuser.png';
import shutdown from './assets/images/shutdown.png';
import frame from './assets/images/frame.png';
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
           {/*  
            <div className="row">
                <div className="column">
                <Button className="button" title="Add Frame" onClick={() => updateOverlayVisibility(true)} />
                </div>
                
            </div>
            <div className="row">
            <Posts posts={posts} />
            </div>
             */}
            <header className={headerContainer}>
                <div className={logoDiv}>
                    <img src={VPlogo} className={logoStyle}/>
                </div>
                {/* <div className={account}>
                    <img src={loginuser} className={accountImg}/> &nbsp;&nbsp;
                    <span>Admin</span>  &nbsp; 
                    <img src={power}  className={accountImg}/>
                </div> */}
            </header>
            <main className={mainContent}>
                <nav className={sideNav}>
                    <ul className={sideLists}>
                        <li className={sideList}>
                            Frames &nbsp; <img src={frame} className={icon}  />
                        </li>
                        <li className={sideList}  title="Add Frame" onClick={() => updateOverlayVisibility(true)}>
                            Add Frame  &nbsp;&#43;
                        </li>
                      
                        <li className={sideList}>
                            Logout &nbsp; <img src={shutdown} className={icon}/>
                        </li>
                    </ul>
                </nav>
                <div className="contentWrapper">
                    <div className="row">
                    {showOverlay && (
                
                        <CreatePost
                            updateOverlayVisibility={updateOverlayVisibility}
                            updatePosts={setPostState}
                            posts={posts}
                        />
                    )}
                    {!showOverlay && (
                        <Posts posts={posts} />
                    )}
                    
                    </div>
                </div>
            </main>
            
            
        </>
    );
}

const overlay = css`
position:absolute;
width:100%;
height:100%;
left:0px;
top:0px;
background:#000;
opacity:0;
transition:opacity 1.3s;
` 
const contentWrapper = css`
padding: 3.25em 1.25em;
`
const mainContent = css`
padding-top:55px;
    display: grid;
    grid-template-columns: 100% 1fr;
    grid-template-columns: 200px 1fr;
    min-height: 100vh;
`
const sideLists = css`
list-style:none;
margin-top:40px; 

`
const sideList = css`
margin-bottom:21px;
color:#fff;
`
const sideNav = css` 
    position: relative;
    top: auto;
    visibility: visible;
    opacity: 1;
    box-shadow: none;
    transition: none; 
    background-color: #2b3035;
    box-shadow: 0 1px 8px rgb(0 0 0 / 10%), 0 8px 24px rgb(0 0 0 / 15%);
`
const accountImg = css`
width: 20px;
`
const icon = css`
width: 12px;
`
const dividerStyle = css`
  margin-top: 15px;
`
const logoStyle = css`
width: 6em; 
`
const logoDiv = css`
display: flex;
-ms-flex-pack: center;
justify-content: center;
-ms-flex-align: center;
align-items: center;
width: 125px;
`
const account = css`
display: flex;
margin-left: auto;
align-items: center; 
`
const headerContainer = css`
z-index: 10;
position: fixed;
height: 64px;
    -ms-flex-pack: start;
    justify-content: flex-start;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    align-items: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .085), 0 1px 8px rgba(0, 0, 0, .1);
`
export default withAuthenticator(Admin);