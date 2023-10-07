import React, { useState } from 'react'
import Navbar from './Navbar'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import adImg from '../img/notePic5New.png'
import tagImg from '../img/tag.png'













export default function PrePage(props) {

  const navigate = useNavigate()




  const params = useParams();
  const iid = parseInt(params.id, 10);
  console.log(iid, "this is iiddd");
  console.log(params, "this is params");

  console.log(props, "props");
  const location = useLocation();
  console.log(location, "location hooks");

  const dataNote = location.state?.data;
  console.log(dataNote, "this is pre page");

  const result = dataNote.find(obj => obj.id === iid);
  console.log(result, "this is result");

  let url = null;
  if (result && iid === result.id) {
    url = result.path;
  }

  console.log(url, "this is url");




  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    // event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages);
  }


  const handlePreview = () => {
    setLoading(false);

  }


  const handleDownloadClcik =()=>{
    if(localStorage.getItem("Token")){
      handleDownload();
    }
    else{
      navigate("/Logisign");
    }
  }


  const handleDownload = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = result.data;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      });
  };

  const renderPages = Array.from(new Array(totalPages), (_, index) => (
    <Page className={'PDFPage PDFPageOne'}    key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} >
      <p>{index + 1}</p>
    </Page>
  ));

  return (


    <>
      <h1>hellow</h1>
      <div className='prePage'>
        <Navbar />
        <div className="noteADD">
                <div className="tag">
                    <img src={tagImg} alt="" />
                </div>
                <div className="items">
                    <div className="adimg">
                        <img src={adImg} alt="" />
                        <div className="adtext">
                            <h1>BEST NOTES</h1>
                        </div>
                    </div>
                </div>
            </div>
        <div className="containerPrePage">

          <div className="prebox" >
            <div className="title" style={{ padding: "0px 30px", color: "#dfc766", textAlign: "center" }}>
              <h1>Topic : {result.data}</h1>
            </div>
            <div className="butPRe">
              <button className='btn1 btn-primary ' onClick={handleDownloadClcik} > Free Download </button>
              <button className='btn2 btn-primary ' onClick={handlePreview} >Preview </button>
            </div>
            <br />
           

 

          </div>
          <br />
        </div>

        <div className="PDFAppp">
          <div className="">
            {loading ? (
              <h1>Click Preview...</h1>
            ) : (
              <center>
                <div className="pdf-container">
                  <Document className={'PDFDocument'} file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    {renderPages}
                  </Document>
                </div>
              </center>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

