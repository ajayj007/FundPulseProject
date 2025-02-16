import React from 'react'
import { useState, useEffect } from "react";

const Demonikhil = () => {
  const [pdfUrl, setPdfUrl] = useState("https://drive.google.com/file/d/1aKBz1Eor5R4BJzH5fETGidx4EICiQIHt/view");

  // useEffect(() => {
  //   const fetchPdf = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}api/investor/${investorId}/document`);
  //       setPdfUrl(response.data.pdfUrl);
  //     } catch (error) {
  //       console.error("Error fetching PDF:", error);
  //     }
  //   };

  //   fetchPdf();
  // }, [investorId]);

  return (
    <div>
      <h2>Uploaded PDF Document</h2>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Document"
        ></iframe>
      ) : (
        <p>No PDF document available.</p>
      )}
    </div>
  );
};

export default Demonikhil;
