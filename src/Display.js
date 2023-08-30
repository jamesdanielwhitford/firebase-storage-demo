import React, { useState, useEffect } from 'react';
import { storage } from './firebase';

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
          const promise = storage.ref(`${category}/${type}s`).listAll().then(items => {
            const itemPromises = items.items.map(item => item.getDownloadURL().then(url => {
              result[category].push({ url, type });
            }));
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
    switch (file.type) {
      case 'jpeg':
      case 'png':
        return <img src={file.url} alt="Uploaded content" width="100" />;
      case 'mp4':
      case 'mpeg':
        return (
          <video width="320" height="240" controls>
            <source src={file.url} type={`video/${file.type}`} />
            Your browser does not support the video tag.
          </video>
        );
      case 'pdf':
        return (
          <iframe
            src={file.url}
            width="100%"
            height="500px"
            title="Uploaded PDF"
          ></iframe>
        );
      default:
        return null;
    }
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
