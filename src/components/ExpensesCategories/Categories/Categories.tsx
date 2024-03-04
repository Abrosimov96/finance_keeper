import {CategoryType, ExpenseType, WalletType} from '../../../App.tsx';
import {Expenses} from '../Expenses/Expenses.tsx';
import './Categories.css'
import {useState} from 'react';

type CategoriesProps = {
    category: CategoryType
    expenses: ExpenseType[]
    wallets: WalletType[]
    addExpenses: (categoryID: string, walletID: string, value: number) => void
};
export const Categories = ({category, expenses, wallets, addExpenses}: CategoriesProps) => {
    const [isVisible, setIsVisible] = useState(false)

    const isModalVisible = (value: boolean) => {
        setIsVisible(value)
    }
    const totalSum = expenses.reduce((acc, curr) => acc + curr.value, 0)
    return (
        <>
            <li key={category.id} className={'categoryItem'} onClick={() => isModalVisible(true)}>
                <span>{category.title}</span>
                <span>{totalSum}</span>
            </li>
            {
                isVisible && <Expenses
                    category={category}
                    isVisible={isModalVisible}
                    expenses={expenses}
                    wallets={wallets}
                    addExpenses={addExpenses}
                />
            }
        </>
    );
};