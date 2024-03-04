import {useState} from 'react'
import {CategoryType, ExpenseType, WalletType} from '../../../App.tsx';
import './Expenses.css'
import {EditableSpan} from '../../EditableSpan/EditableSpan.tsx';
import {EditableSpanNumber} from '../../EditableSpanNumber/EditableSpanNumber.tsx';

type ExpensesProps = {
    expenses: ExpenseType[]
    category: CategoryType
    isVisible: (value: boolean) => void
    wallets: WalletType[]
    addExpenses: (categoryID: string, walletID: string, value: number) => void
    changeCategoryTitle: (categoryID: string, title: string) => void
    changeExpenseValue: (categoryID: string, expenseID: string, value: number) => void
};
export const Expenses = ({
                             expenses,
                             category,
                             isVisible,
                             wallets,
                             addExpenses,
                             changeCategoryTitle,
                             changeExpenseValue
                         }: ExpensesProps) => {
    const [selectedWallet, setSelectedWallet] = useState(wallets[0].title)
    const [expenseValue, setExpenseValue] = useState<number | ''>('')

    const onAddExpense = () => {
        const wallet = wallets.find(wallet => wallet.title === selectedWallet)
        if (wallet && expenseValue) {
            addExpenses(category.id, wallet.id, expenseValue)
            setExpenseValue('')
        }
    }
    const onChangeCategoryTitle = (value: string) => {
        changeCategoryTitle(category.id, value)
    }
    const onChangeExpenseValue = (expenseID: string, value: number) => {
        changeExpenseValue(category.id,expenseID, +value)
    }
    const hideModal = () => {
        isVisible(false)
    }
    return (
        <div className={'modalExpenses'} onClick={hideModal}>
            <div className={'expenses'} onClick={e => e.stopPropagation()}>
                <h3><EditableSpan value={category.title} saveChanges={onChangeCategoryTitle}/></h3>
                {expenses.map(expense => <EditableSpanNumber
                    value={expense.value}
                    saveChanges={(value) =>onChangeExpenseValue(expense.id, value)}
                />)}
                {
                    <>
                        <input type={'number'} value={expenseValue}
                               onChange={e => setExpenseValue(+e.currentTarget.value)}/>
                        <label>
                            Выберите кошелек:
                            <select value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}>
                                {
                                    wallets.map(wallet => <option key={wallet.id} value={wallet.title}>
                                        {
                                            wallet.title
                                        }
                                    </option>)
                                }
                            </select>
                        </label>
                    </>
                }
                <button onClick={onAddExpense}>Добавить разход</button>
            </div>
        </div>
    );
};