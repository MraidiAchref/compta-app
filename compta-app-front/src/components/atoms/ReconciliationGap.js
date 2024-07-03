import React from 'react';
import "./ReconciliationGap.css";

export default function ReconciliationGap({totalDebitCompta,totalCreditCompta,totalDebitBank,totalCreditBank,tableData,bankStatementData,checkedBankStatementData_Ids}) {
     let gapValue = ( totalDebitCompta - totalCreditCompta) - ( totalCreditBank - totalDebitBank) ;
  return (
    <div>

        <div className="reconciliation-gap-container">
          <div className="labels-container">
              <label>Ecart de rapprochement </label>
              <p> {gapValue} <b>DT</b> </p>
          </div>
          <table className="table-container">
            <thead>
                <tr>
                  <th>Date</th>
                  <th>Libéllé</th>
                  <th>Débit</th>
                  <th>Crédit</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td colSpan="4" className="subtitle">Provenance du compte 532</td>
                </tr>
                {tableData.map((row) => (
                  <tr key={row.ID}>
                    <td>{row.Date}</td>
                    <td>{row.Description}</td>
                    <td>{row.Debit}</td>
                    <td>{row.Credit}</td>
                  </tr>
                ))} 
                <tr>
                  <td colSpan="4" className="subtitle">Provenance du relevé bancaire</td>
                  </tr>
                  {bankStatementData.map((row) => {
                    if (!checkedBankStatementData_Ids.includes(row.ID) ){
                      return (
                      <tr key={row.ID}>
                        <td>{row.Date}</td>
                        <td>{row.Description}</td>
                        <td>{row.Debit}</td>
                        <td>{row.Credit}</td>
                      </tr>
                      )
                    }
                  })}
                
            </tbody>
        </table>
        </div>
      
    </div>
  )
}
