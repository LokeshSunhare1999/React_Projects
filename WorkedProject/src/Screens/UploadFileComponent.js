import React, { useState } from 'react';
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { getRandomName } from '../utils/Helper';
import '../Screens/ContentManagement/VideosPodcasts/AddVideoPodcasts';

const UploadFileComponent = (props) => {
  const { filePath, setShow, fileNameIncludeHTTPS, setFileForThumbNail, acceptFileType, selectedOption, selectedProgram, type, fileChangeVideo, setSomChange, setFileName, setShowLoaderUpload, setFormattedVideoDuration } = props;
  const showLoader = (val) => {
    if (val) {
      setShowLoaderUpload(true);
    } else {
      setShowLoaderUpload(false);
    }
  }

  const handleUpload = async (e) => {
    if (e.length === 0) {
      return false;
    }
    const imageAsFile = e[0];
    if(!fileNameIncludeHTTPS && type === "blogs & articles"){
      setShowLoaderUpload(true)
      const fileName = imageAsFile.name;
      const path = `${filePath}/${fileName}`;
      setFileName(path);
      setFileForThumbNail(URL.createObjectURL(imageAsFile));
      setShow(true)
      return;
    }

    if (type === "video & podcast") {
      const file = imageAsFile;
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.addEventListener('loadedmetadata', function () {
        const duration = parseInt(video.duration);
        setFormattedVideoDuration(duration)
      });
      video.load();
    }
    const fileName = imageAsFile.name;
    const storage = getStorage(app);
    const path = `${filePath}/${fileName}`;
    setFileName(path);
    const fileRef = ref(storage, path);
    showLoader(true);
    getDownloadURL(fileRef)
      .then((url) => {
        if (type === "blogs & articles") {
          showLoader(false);
          setFileForThumbNail(url);
        } else if (type === "video & podcast") {
          let blobUrl = (URL.createObjectURL(imageAsFile));
          setFileForThumbNail(blobUrl);
          fileChangeVideo(imageAsFile);
        } else if (type === "recipe") {
          setFileForThumbNail(URL.createObjectURL(imageAsFile));
          setSomChange(true);
        }
      })
      .catch((error) => {
        if (type === "blogs & articles") {
          showLoader(true);
        } else if (type === "video & podcast") {
          showLoader(true);
          let blobUrl = (URL.createObjectURL(imageAsFile));
          setFileForThumbNail(blobUrl);
          fileChangeVideo(imageAsFile);
        } else if (type === "recipe") {
          setFileForThumbNail(URL.createObjectURL(imageAsFile));
          setSomChange(true);
        }
        const metadata = { cacheControl: 'public, no-cache' };
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, imageAsFile, metadata);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            if (type === "blogs & articles") {
              showLoader(false);
            }
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
              if (type === "blogs & articles") {
                showLoader(false);
                setFileForThumbNail(downloadURLs);
              }
            });
          }
        );
      });
  }

  return (
    <div>
      <label htmlFor="file-input"
        className={filePath.includes("undefined") && selectedOption?.label !== ""
          && selectedProgram?.label !== "" ? "btn-add-media-disabled" : "btn-add-media"}>
        Browse
      </label>
      <input
        id="file-input"
        type="file"
        accept={acceptFileType}
        onChange={(e) => { handleUpload(e.target.files) }}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default UploadFileComponent;