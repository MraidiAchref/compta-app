import React from 'react';
import "./ReconciliationGap.css";

export default function ReconciliationGap({totalDebitCompta,totalCreditCompta,totalDebitBank,totalCreditBank,tableData}) {
     let gapValue = ( totalDebitCompta - totalCreditCompta) - ( totalCreditBank - totalDebitBank) ;
  return (
    <div>

        <div className="reconciliation-gap-container">
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
                {tableData.map((row) => (
                  <tr key={row.ID}>
                    <td>{row.Date}</td>
                    <td>{row.Description}</td>
                    <td>{row.Debit}</td>
                    <td>{row.Credit}</td>
                  </tr>
                ))}
            </tbody>
        </table>
            <div className="labels-container">
              <label>Ecart de rapprochement </label>
              <p> {gapValue} <b>DT</b> </p>
            </div>
        </div>
      
    </div>
  )
}
