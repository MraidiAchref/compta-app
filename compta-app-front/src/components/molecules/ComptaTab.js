import React, { useState, useEffect } from "react";
import "./ComptaTabStyle.css";
import { ClipLoader } from "react-spinners"; 

/*const initialData = [
  {
    ID: 1,
    Date: "25/06/2024",
    Description: "versement espèce",
    Pointage: "OK",
    Debit: 1400,
    Credit: 0,
    Checked: true,
  },
  {
    ID: 2,
    Date: "25/06/2024",
    Description: "réglement par chéque n 236",
    Pointage: "",
    Debit: 0,
    Credit: 900,
    Checked: false,
  },
];*/

export default function ComptaTab({totalDebitCompta,totalCreditCompta,updateTotalsCompta,setcheckedData}) {
  const [fetchedData, setfetchedData] = useState([]);
  const [data, setData] = useState([]);
  const today = new Date();
  const initialDate = today.toISOString().split('T')[0]; 
  const [selectedDate , setSelectedDate] = useState(initialDate); 
  const [isProcessing, setIsProcessing] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsProcessing(true) ;
        const response = await fetch(`http://127.0.0.1:8000/getTransactionsAtDate?date=${selectedDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setfetchedData(jsonData);
        setIsProcessing(false) ;

      } catch (error) {
        console.error("Error fetching data:", error);
        setIsProcessing(false) ;

      }
    };

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    const mappedTransactions = fetchedData.map((transaction) => ({
      ...transaction,
      Checked: false,
      Pointage: "",
    }));
    setData(mappedTransactions);

    let debitTotal = 0;
    let creditTotal = 0;
    mappedTransactions.forEach((transaction) => {
      debitTotal += transaction.Debit;
      creditTotal += transaction.Credit;
    });
    updateTotalsCompta(debitTotal, creditTotal);

    let checkedData = [] ;
    mappedTransactions.forEach((row) => {
      if(!row.Checked) checkedData.push(row) ;
    })
    setcheckedData(checkedData) ;

  }, [fetchedData]);


  const handleChangeDate =(e) => {
    setSelectedDate(e.target.value);
  }



  const handleCheckboxChange = (id) => {
    const updatedData = data.map((row) => {
      //console.log(row);
      if (row.ID === id) {
        row.Checked = !row.Checked;
        row.Pointage = row.Checked ? "OK" : "";
      }      
      return row;
    });
    setData(updatedData);
    let checkedData = [] ;
    updatedData.forEach((row) => {
      if(!row.Checked) checkedData.push(row) ;
    })
    setcheckedData(checkedData) ;

  };

  return (
    <div>
      <div className="component-container">
          <div className="date-selector-wrapper">
            <label htmlFor="date-selector" >Selectionnez une Date:</label>
            <input id="date-selector" name="date-selector" type="date" value={selectedDate} onChange={handleChangeDate}/>
            
          </div>
        <caption className="table_caption">Votre compte 532</caption>
        <table className="table-container">
          <thead>
            <tr>
              <th>Date</th>
              <th>Libéllé</th>
              <th>Pointage</th>
              <th>Débit</th>
              <th>Crédit</th>
              <th>Check</th>
            </tr>
          </thead>
          {isProcessing ? (
          <div className="loading-container">
            <ClipLoader size={50} color={"#123abc"}  loading={isProcessing} />
            <p>Processing...</p>
          </div>
        ) : (
          <>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.ID}
                className={row.Checked ? "table-row-selected" : ""}
              >
                <td>{row.Date}</td>
                <td>{row.Description}</td>
                <td>{row.Pointage}</td>
                <td>{row.Debit}</td>
                <td>{row.Credit}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.Checked}
                    onChange={() => handleCheckboxChange(row.ID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
              <tr>
                <td colSpan="3">Total:</td>
                <td>{totalDebitCompta} <b>DT</b></td>
                <td>{totalCreditCompta} <b>DT</b></td>
              </tr>
            </tfoot>
          </>
        )}
        </table>
      </div>
    </div>
  );
}
