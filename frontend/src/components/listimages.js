import axios from 'axios';
import { useEffect, useState } from 'react';

function ListImages() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getImages();
  }, [])

  const getImages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/test/getimages");
      const data = response?.data;
      setData(data)
    } catch (error) {
      console.log(error);
    }

  }

 

 


  return (
   
  
  <div class="flex-1">

  <div class="bg-white">
  <div class="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
    <h2 class="text-2xl font-bold tracking-tight pb-5  text-gray-900 text-center">List of Images</h2>
       <div className='w-full flex flex-wrap gap-2'>
         {data.map((item, index) => (
           <div key={index} className='space-y-4'>
             <img src={item.url} alt='img' className='w-[200px] object-cover' />
             <h2 className='text-xs ml-4'>name:{item.name}</h2>
             <h2 className='text-xs ml-4'>createdAt:{item.createdAt}</h2>
           </div>
         ))}
       </div>

  </div>
</div>
  </div> 
  );
}

export default ListImages;
