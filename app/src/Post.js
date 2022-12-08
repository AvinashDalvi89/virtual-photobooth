import React, { useState, useEffect } from 'react'
import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import { getTemplate } from './graphql/queries';
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';
import Webcam from "react-webcam";
// import * as htmlToImage from 'html-to-image';
import { saveAsPng } from 'save-html-as-image';
export default function Post() {
  const [loading, updateLoading] = useState(true);
  const [post, updatePost] = useState(null);
  const { id } = useParams()
  useEffect(() => {
    fetchPost()
  }, [])
  const [imgSrc, setImgSrc] = React.useState(null);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    console.log(imageSrc)
    // var clickedPhoto = URL.createObjectURL(imageSrc);
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  if (loading) return <h3>Loading...</h3>


  let video = document.querySelector("#video");
  let videoSrc

  let imageSrc

  async function fetchPost() {
    try {
      const postData = await API.graphql({
        query: getTemplate, variables: { id }
      });
      const currentPost = postData.data.getTemplate
      const image = await Storage.get(currentPost.image, { download: true });
      var tmp_path = URL.createObjectURL(image.Body);
      currentPost.image = tmp_path;
      updatePost(currentPost);
      updateLoading(false);
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function clickPhoto(e) {
    const canvas = await html2canvas(document.getElementById("card1"), {
      dpi: 144,
      allowTaint: false,
      useCORS: true,
      logging: true,
      onrendered: function (canvas) {
        console.log(canvas)
      }
    });
    console.log(canvas)
    const dataURL = canvas.toDataURL('image/png', 1.0);
    downloadjs(dataURL, 'download.png', 'image/png');
    //-----
    // Canvas2Image.saveAsPNG(canvas)
    //---
    // htmlToImage.toPng(document.getElementById("card1")).then((dataUrl) => {
    //   console.log(dataUrl)
    //   downloadjs(dataUrl, 'download.png', 'image/png');
    // });
    //-----
    // saveAsPng(document.getElementById("card1"), { filename: 'virtual-photobooth', printDate: true }, {
    //   backgroundColor: 'rgba(101,198,185,0.5)',
    //   style: {
    //     objectFit: "cover",
    //     marginTop: "82px",
    //     marginLeft: "6px",
    //     padding: "10px",
    //     cursor: "move",
    //     width: "278px",
    //     height: "305px"
    //   }
    // })
  }
  console.log('post: ', post)
  let photoStyle = {
    backgroundImage: `url(${post.image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    width: '350px',
    height: '450px',
    margin: '2em auto',
    zIndex: 100,
  };
  let cameraMirorStyle = {
    // objectFit: "cover",
    marginTop: "82px",
    marginLeft: "6px",
    padding: "10px",
    // cursor: "move",
    // width: "278px",
    // height: "305px",
  }
  let videoConstraints = {
    width: 320,
    height: 235,
    facingMode: "user"
  }
  return (
    <>
      <h1 className={titleStyle}>{post.name}</h1>
      <div className='row'>
  <div className="column clickframe" >
        <h2>Click your photo with frame</h2>

        <div className="framebg cardwp" id="card1" crossOrigin="anonymous" style={photoStyle}>
          <div className="card-body" style={cameraMirorStyle}>
            <Webcam
              audio={false}
              height={240}
              screenshotFormat="image/jpeg"
              width={320}
              videoConstraints={videoConstraints}
              ref={webcamRef}
            >
              {/* {({ getScreenshot }) => (
                <button
                  onClick={() => {
                    imageSrc = getScreenshot()
                    console.log(imageSrc)
                  }}
                >
                  Capture photo
                </button>
              )} */}
            </Webcam>
          </div>
        </div>
        {/* <button id="start-camera" onClick={cameraStart} >Start Camera</button> */}
        <button className="button" id="click-photo" onClick={clickPhoto}>Click Photo</button>
      </div>
      {/* { <div className="column viewframe">
        <h2>Review & download photo</h2>
        <div id="bnophoto">
          <div className="card cardwop" id="photoframe" crossOrigin="anonymous" style={photoStyle}>
            <div className="card-body">
              <img src={imgSrc} className="galleryImage" crossOrigin="anonymous"/>
            </div>
          </div>
          <div>
            <button className="button" id="take-shot" onClick={clickPhoto}>
              Download
            </button>
          </div>
        </div>
      </div>  } */}
      </div>
    
    </>
  )
}

const titleStyle = css`
  margin-bottom: 7px;
  text-align: center;
  color: orange;
`

const locationStyle = css`
  color: #0070f3;
  margin: 0;
`

const imageStyle = css`
  max-width: 500px;
  @media (max-width: 500px) {
    width: 100%;
  }
  `



