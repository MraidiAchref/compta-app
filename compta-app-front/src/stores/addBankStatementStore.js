import { create } from 'zustand';

const useAddBankStatementStore = create((set, get) => ({ 
  date: '', 
  description: '',
  credit: 0,
  debit: 0,
  handleChangeDate: (value) => set({ date: value }),
  handleChangeDescription: (value) => set({ description: value }),
  handleChangeCredit: (value) => set({ credit: parseFloat(value) || 0 }),
  handleChangeDebit: (value) => set({ debit: parseFloat(value) || 0 }),
  handleClickAdd: (bankStatementData, setBankStatementData) => {
    const { date, description, credit, debit } = get();
    const newRow = {
      Date: date,
      Description: description,
      Credit: credit,
      Debit: debit,
    };
    setBankStatementData([...bankStatementData, newRow]);
  },
}));

export default useAddBankStatementStore;
