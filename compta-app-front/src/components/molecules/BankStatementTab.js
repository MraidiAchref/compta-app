import "./BankStatementTabStyle.css";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners"; 


export default function BankStatementTab({totalDebitBank,totalCreditBank,updateTotalsBank,setCheckedBankStatementData_Ids,setBankStatementData, bankStatementData
}) {
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
          setBankStatementData(result.data);
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
    bankStatementData.forEach((row) => {
      if (parseFloat(row.Debit)) {debitTotal += parseFloat(row.Debit)};
      if (parseFloat(row.Credit)) {creditTotal += parseFloat(row.Credit)};
    });
    updateTotalsBank(debitTotal, creditTotal);
    //setBankStatementData(bankStatementData);
    
  }, [bankStatementData]);

  const [doubleClickedRowIds, setDoubleClickedRowIds] = useState([]);

  const handleDoubleClick = (rowId) => {
    if (doubleClickedRowIds.includes(rowId)){
      let newArray= doubleClickedRowIds.filter((id)=>id !== rowId) ;
      setDoubleClickedRowIds(newArray);
      setCheckedBankStatementData_Ids(newArray);
    }else {
      setDoubleClickedRowIds([...doubleClickedRowIds, rowId]);
      setCheckedBankStatementData_Ids([...doubleClickedRowIds, rowId]);
    }
  };

  const [searchInputValue,setSearchInputValue] = useState(null) ;
  const handleTypingInInput= (event)=> {
    const textTyped = event.target.value.toLowerCase() ;

    if (textTyped ===""){
      setSearchInputValue(null) ;
    }else {
      setSearchInputValue(textTyped) ;
    }
  }

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
                {bankStatementData.map((row) => (
                  <tr key={row.ID}  onDoubleClick={() => handleDoubleClick(row.ID)} style={{backgroundColor: doubleClickedRowIds.includes(row.ID)  ? 'green' : 'inherit',}}>
                    <td style={{backgroundColor:  row.Date.toLowerCase().includes(searchInputValue) ? 'yellow' : 'inherit',}}>{row.Date}</td>
                    <td style={{backgroundColor:  row.Description.toLowerCase().includes(searchInputValue)  ? 'yellow' : 'inherit',}}>{row.Description}</td>
                    <td style={{backgroundColor:  row.Credit.toString().toLowerCase().includes(searchInputValue)  ? 'yellow' : 'inherit',}}>{row.Credit}</td>
                    <td style={{backgroundColor:   row.Debit.toString().toLowerCase().includes(searchInputValue)?  'yellow' : 'inherit',}}>{row.Debit}</td>
                  </tr>
                ))}
                  <tr >
                    <td>Recherche </td>
                    <td  colSpan="3" onChange={handleTypingInInput}><input  type="text" id="input-seach-bar"/> </td>

                  </tr>
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
