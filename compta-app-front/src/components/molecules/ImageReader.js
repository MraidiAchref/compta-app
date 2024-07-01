import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Papa from 'papaparse';


export default function ImageReader() {
  const [image, setImage] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIsProcessing(true);
      processImage(file);
    }
  };

  const processImage = async (file) => {
    try {
      const img = await loadImage(URL.createObjectURL(file));
      const processedImage = preprocessImage(img);
      extractTextFromImage(processedImage);
    } catch (err) {
      setError(`Error processing image: ${err.message}`);
      setIsProcessing(false);
    }
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  const preprocessImage = (img) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;

    // Convert to grayscale
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);

    // Increase contrast and apply thresholding
    const contrast = 40; // Increase contrast by 40%
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] * contrast / 100;
      data[i + 1] = data[i + 1] * contrast / 100;
      data[i + 2] = data[i + 2] * contrast / 100;
      data[i + 3] = 255; // Set alpha channel to fully opaque
    }
    ctx.putImageData(imageData, 0, 0);

    // Convert to binary (thresholding)
    for (let i = 0; i < data.length; i += 4) {
      const brightness = data[i];
      const threshold = brightness < 128 ? 0 : 255;
      data[i] = data[i + 1] = data[i + 2] = threshold;
    }
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL('image/png');
  };

  const extractTextFromImage = (processedImage) => {
    Tesseract.recognize(
      processedImage,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    )
    .then(({ data: { text } }) => {
      processTextToCSV(text);
      setIsProcessing(false);
    })
    .catch((err) => {
      setError(`Error extracting text: ${err.message}`);
      setIsProcessing(false);
    });
  };

  const processTextToCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');

    const processedData = [];
    let isHeader = false;
    let headers = [];

    lines.forEach(line => {
      if (!isHeader) {
        if (line.includes('ID') && line.includes('Date') && line.includes('Description') && line.includes('Credit') && line.includes('Debit')) {
          isHeader = true;
          headers = line.split(/\s+/);
          processedData.push(headers);
        }
      } else {
        const row = [];
        let currentIndex = 0;

        headers.forEach((header, index) => {
          const match = line.substring(currentIndex).match(/(\S+\s*\S*)/);
          if (match) {
            row.push(match[0].trim());
            currentIndex += match.index + match[0].length + 1;
          } else {
            row.push('');
          }
        });

        processedData.push(row);
      }
    });

    setCsvData(processedData);

    const csv = Papa.unparse(processedData);
    downloadCSV(csv);
  };

  const downloadCSV = (csv) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "bank_statement.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <label>Upload an image of your bank statement:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {isProcessing && <p>Processing...</p>}
      {csvData.length > 0 && (
        <table>
          <thead>
            <tr>
              {csvData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
