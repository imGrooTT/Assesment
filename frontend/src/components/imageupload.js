import axios from 'axios';
import {  useState } from 'react';

function Fileupload() {

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filter, setFilter] = useState('');
 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Preview the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    try {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
        await axios.post("http://localhost:3000/test/uploadImage", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      window.alert("Document uploaded successfully!");
        window.location.reload(true);
      
    } catch (error) {
      window.alert("Error uploading document. Please try again.");
      console.log(error);
    }
  };

  const applyFilter = () => {
    // Apply selected filter to the preview image
    if (previewUrl) {
      const image = document.getElementById('preview-image');
      image.style.filter = filter;
    }
  };

  return (
  <div class="bg-gray-800 text-white w-64">
    <div class="p-4 mt-10">
       <div className='space-y-4'>
         <input type="file" onChange={handleFileChange} />
         {previewUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Preview:</h2>
          <img id="preview-image" src={previewUrl} alt="Preview" className="max-w-xs mt-2" />
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-lg font-bold">Filter Options:</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="mt-2">
          <option value="">Select Filter</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="sepia(100%)">Sepia</option>
        </select>
        <button onClick={applyFilter} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Apply Filter
        </button>
      </div>
         <button className='bg-slate-400 text-white p-2 rounded-lg' onClick={handleUpload}>Upload</button>
       </div>
     
    </div>
  </div>
  
  );
}

export default Fileupload;
