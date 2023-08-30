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

      for (let category of categories) {
        for (let type of types) {
          const items = await storage.ref(`${category}/${type}s`).listAll();
          for (let item of items.items) {
            const url = await item.getDownloadURL();
            result[category].push({ url, type });
          }
        }
      }

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
    <div>
      {Object.keys(files).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          {files[category].map((file, index) => (
            <div key={index}>{renderFile(file)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Display;
