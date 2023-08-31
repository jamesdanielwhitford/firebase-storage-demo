import React, { useState, useEffect } from 'react';
import { storage, firestore } from './firebase';

function Display() {
  const [files, setFiles] = useState({
    Writing: [],
    Pottery: [],
    Locations: [],
    Music: []
  });

  useEffect(() => {
    const fetchFiles = async () => {
      const categories = ['Writing', 'Pottery', 'Locations', 'Music'];
      const types = ['jpeg', 'png', 'mp4', 'mpeg', 'pdf'];
      let result = {
        Writing: [],
        Pottery: [],
        Locations: [],
        Music: []
      };

      const promises = [];

      for (let category of categories) {
        for (let type of types) {
          const promise = storage.ref(`${category}/${type}s`).listAll().then(async items => {
            const itemPromises = items.items.map(async item => {
              const url = await item.getDownloadURL();
              const docId = item.name.split('_')[0]; // Extract the document ID from the file name
              const docRef = firestore.collection('media').doc(docId);
              const docData = await docRef.get();
              if (docData.exists) {
                result[category].push({ ...docData.data(), url, type });
              }
            });
            return Promise.all(itemPromises);
          });
          promises.push(promise);
        }
      }

      await Promise.all(promises);
      setFiles(result);
    };
    fetchFiles();
  }, []);

  const renderFile = (file) => {
    return (
      <div className="media-wrapper">
        <div className="media-metadata">
          {file.date && <p>Date: {new Date(file.date.seconds * 1000).toLocaleDateString()}</p>}
          {file.description && <p>Description: {file.description}</p>}
          {file.location && <p>Location: <a href={`https://www.google.com/maps?q=${file.location.lat},${file.location.lng}`} target="_blank" rel="noopener noreferrer">Co-ordinates</a></p>}
          <a href={file.url} target="_blank" rel="noopener noreferrer">Open file</a>
        </div>
        <div className="media-content">
          {file.type === 'jpeg' || file.type === 'png' ? (
            <img src={file.url} alt="Uploaded content" width="100" />
          ) : file.type === 'mp4' || file.type === 'mpeg' ? (
            <video width="320" height="240" controls>
              <source src={file.url} type={`video/${file.type}`} />
              Your browser does not support the video tag.
            </video>
          ) : file.type === 'pdf' ? (
            <iframe
              src={file.url}
              width="100%"
              height="500px"
              title="Uploaded PDF"
            ></iframe>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="display-container">
      {Object.keys(files).map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-header">{category}</h2>
          {files[category].map((file, index) => (
            <div key={index} className="media-item">{renderFile(file)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Display;
