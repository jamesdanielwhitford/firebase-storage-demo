import React, { useState } from 'react';
import { storage } from './firebase';

function Upload() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [category, setCategory] = useState('Writing'); // Default category

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const type = e.target.files[0].type.split('/')[1];
      setFileType(type);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`${category}/${fileType}s/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref(`${category}/${fileType}s`)
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
          });
      }
    );
  };

  return (
    <div>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="Writing">Writing</option>
        <option value="Pottery">Pottery</option>
        <option value="Locations">Locations</option>
        <option value="Music">Music</option>
      </select>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;
