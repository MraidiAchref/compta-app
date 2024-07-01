import React from 'react'
import "./ReconciliationGap.css"

export default function ReconciliationGap({totalDebitCompta,totalCreditCompta,totalDebitBank,totalCreditBank}) {
     let gapValue = ( totalDebitCompta - totalCreditCompta) - ( totalCreditBank - totalDebitBank) ;
  return (
    <div>
        <div className="reconciliation-gap-container">
            <label>Ecart de rapprochement </label>
            <p> {gapValue} <b>DT</b> </p>
        </div>
      
    </div>
  )
}
