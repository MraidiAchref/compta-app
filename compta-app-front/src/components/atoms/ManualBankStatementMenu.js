import React from 'react';
import './ManualBankStatementMenuStyle.css';
import useAddBankStatementStore from '../../stores/addBankStatementStore';

export default function ManualBankStatementMenu({ isVisible, onCloseAction, bankStatementData, setBankStatementData }) {
  const { date, description, credit, debit, handleChangeDate, handleChangeDescription, handleChangeCredit, handleChangeDebit, handleClickAdd } = useAddBankStatementStore();

  if (!isVisible) return null;

  return (
    <div className='pop-up-menu'>
      <div>
        <label>Date</label>
        <input type='date' value={date} onChange={(e) => handleChangeDate(e.target.value)} />
        <label>Libéllé</label>
        <input value={description} onChange={(e) => handleChangeDescription(e.target.value)} />
        <label>Crédit</label>
        <input type='number' value={credit} onChange={(e) => handleChangeCredit(e.target.value)} />
        <label>Débit</label>
        <input type='number' value={debit} onChange={(e) => handleChangeDebit(e.target.value)} />
      </div>
      <button onClick={() => handleClickAdd(bankStatementData, setBankStatementData)}>Confirmer</button>

      <lord-icon
        id="close-button"
        src="https://cdn.lordicon.com/jqnbdcqr.json"
        trigger="hover"
        onClick={onCloseAction}
      />
    </div>
  );
}
