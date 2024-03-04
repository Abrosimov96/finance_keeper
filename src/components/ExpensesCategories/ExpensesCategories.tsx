import {CategoryExpenseType, CategoryType, WalletType} from '../../App.tsx';
import {Categories} from './Categories/Categories.tsx';
import './ExpensesCategories.css'

type ExpensesCategoriesProps = {
    categories: CategoryType[]
    expenses: CategoryExpenseType
    wallets: WalletType[]
    addExpenses: (categoryID: string, walletID: string, value: number) => void
};
export const ExpensesCategories = ({categories, expenses, wallets, addExpenses}: ExpensesCategoriesProps) => {
    return (
        <div>
            <ul className={'exCatList'}>
                {
                    categories.map(category => <Categories
                        key={category.id}
                        category={category}
                        expenses={expenses[category.id]}
                        wallets={wallets}
                        addExpenses={addExpenses}
                    />)
                }
            </ul>
        </div>
    );
};