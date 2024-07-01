import "./BankStatementTabStyle.css";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners"; 


export default function BankStatementTab({totalDebitBank,totalCreditBank,updateTotalsBank}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setIsProcessing(true);
      Papa.parse(file, {
        skipEmptyLines: true,
        step: (result, parser) => {
          const row = result.data;
          if (row.includes("ID")) {
            parser.abort();
            processCSV(file, result.meta.cursor - row.join(',').length - 1);
          }
        },
        error: (err) => {
          setError(err.message);
          setIsProcessing(false);
        },
      });
    }
  };

  const processCSV = (file, start) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      const csv = target.result;
      const slicedCsv = csv.slice(start);
      Papa.parse(slicedCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data);
          setIsProcessing(false);
        },
        error: (err) => {
          setError(err.message);
          setIsProcessing(false);
        },
      });
    };
    reader.onerror = (err) => {
      setError(err.message);
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    let debitTotal = 0;
    let creditTotal = 0;
    data.forEach((row) => {
      if (parseFloat(row.Debit)) {debitTotal += parseFloat(row.Debit)};
      if (parseFloat(row.Credit)) {creditTotal += parseFloat(row.Credit)};
    });
    updateTotalsBank(debitTotal, creditTotal);

  }, [data]);

  return (
    <div>
      <div className="component-container">
        <label htmlFor="csv-file-loader" id="csv-file-loader-label" >Importer un fichier excel </label>
        <input id="csv-file-loader" type="file" accept=".csv" onChange={handleFileChange} />
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {isProcessing ? (
          <div className="loading-container">
            <ClipLoader size={50} color={"#123abc"} loading={isProcessing} />
            <p>Processing...</p>
          </div>
        ) : (
          <>
            <caption className="table_caption">Votre relevé bancaire </caption>
            <table className="table-container">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Libéllé</th>
                  <th>Crédit</th>
                  <th>Débit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.ID}>
                    <td>{row.Date}</td>
                    <td>{row.Description}</td>
                    <td>{row.Credit}</td>
                    <td>{row.Debit}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
              <tr>
                <td colSpan="2">Total:</td>
                <td>{totalCreditBank} <b>DT</b></td>
                <td>{totalDebitBank} <b>DT</b></td>
              </tr>
            </tfoot>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
