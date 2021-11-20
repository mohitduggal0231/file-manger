/*import React from "react"
import "./homepage.css"


const Homepage = ({setLoginUser}) => {
    return (
        <div className="homepage">
            <h1>Hello Homepage</h1>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}

export default Homepage*/


import React, {useState, useEffect} from 'react';
import FileUploadScreen from '../uploader/screens/FileUploadScreen';
import {getMultipleFiles} from '../uploader/data/api';
import SearchBar from '../SearchBar/SearchBar';
import "./homepage.css"
import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/';


const Homepage = ({setLoginUser}) => {
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [srchData,setSrchData] = useState([]);
  
  const getMultipleFilesList = async () => {   
    try {
        const fileslist = await getMultipleFiles();
        setMultipleFiles(fileslist);
        console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }

  const searchText= async(data)=>{
//console.log(data);
axios.post('http://localhost:8080/searchName',{ID : data})
.then(function (response) {
  setSrchData(response.data);
  console.log('hello',srchData);
  console.log('hi',multipleFiles);
})
.catch(function (error) {
  console.log(error);
});
  /*axios.get(apiUrl+'searchFiles').then(res=>{
    this.setState({});
  });*/
  }
  
  useEffect(() => {
    getMultipleFilesList();
  }, []);

  
  return (
    <div>
        <div className="Homepage">
        <div className="button " className="btn btn danger" onClick={() => setLoginUser({})} >Logout</div>
          <h3 className="text-danger font-weight-bolder border-bottom text-center">File-Manager</h3>  
          <div className="App">
      
    

    </div>
          <FileUploadScreen  getMultiple={() => getMultipleFilesList()}/>
          <SearchBar placeholder="Search a file" handleChange={(e)=>searchText(e.target.value)} />
       </div> 
       <div className="container-fluid mt-5">
         <div className="row">
           <div className="col-6">
             <h4 className="text-success font-weight-bold">Search List</h4>
              {srchData.map((element,index) =>
                <div key={element._id}>
                    <h6 className="text-danger font-weight-bold">{element.title}</h6>
                    <div className="row">
                      {element.files.map((file, index) =>
                        <div className="col-6">
                            <div className="card mb-2 border-0 p-0">
                              <div>
                                <p>{file.fileName}</p>
                              </div>
                              <embed type={file.fileType} src={`http://localhost:8080/${file.filePath}`} width="300" height="300" className="card-img-top img-responsive" />
                              <iframe src={`http://localhost:8080/${file.filePath}`}></iframe>
                              </div>
                          </div>
                       )}
                      </div>
                </div>
              )}
           </div>
         </div>
       </div>

    </div>
  );
}

export default Homepage
