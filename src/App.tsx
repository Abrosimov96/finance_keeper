import './App.css'
import {v1} from 'uuid';
import {useState} from 'react';
import {AddForm} from './components/AddRevenue/AddForm.tsx';
import {Revenues} from './components/Revenues/Revenues.tsx';
import {Statistic} from './components/Statistic/Statistic.tsx';
import {Wallets} from './components/Wallets/Wallets.tsx';
import {ExpensesCategories} from './components/ExpensesCategories/ExpensesCategories.tsx';

export type RevenueType = {
    id: string
    title: string
    monthlySalary: number
    currentValue: number
}

export type WalletType = {
    id: string
    title: string
    currentValue: number
}

export type CategoryType = {
    id: string
    title: string
    limit: number
}

export type ExpenseType = {
    id: string
    value: number
}
export type CategoryExpenseType = {
    [key: string]: ExpenseType[]
}

const myRevenues: RevenueType[] = [
    {id: v1(), title: 'Зарплата', monthlySalary: 2865, currentValue: 1029},
    {id: v1(), title: 'Мороженое', monthlySalary: 3000, currentValue: 700}
]

const myWallets: WalletType[] = [
    {id: v1(), title: 'Кошелек', currentValue: 408},
    {id: v1(), title: 'Карта', currentValue: 542},
]

const categoryID1 = v1()
const categoryID2 = v1()
const categoryID3 = v1()
const categoryID4 = v1()

const myCategories: CategoryType[] = [
    {id: categoryID1, title: 'Еда', limit: 600},
    {id: categoryID2, title: 'Машина', limit: 400},
    {id: categoryID3, title: 'Одежда', limit: 200},
    {id: categoryID4, title: 'Коммунальные услуги', limit: 200},
]

const expenses1: ExpenseType[] = [
    {id: v1(), value: 50}
]
const expenses2: ExpenseType[] = [
    {id: v1(), value: 40},
    {id: v1(), value: 30},
]
const expenses3: ExpenseType[] = [
    {id: v1(), value: 20},
    {id: v1(), value: 10},
]
const expenses4: ExpenseType[] = [
    {id: v1(), value: 50},
    {id: v1(), value: 25},
    {id: v1(), value: 50},
    {id: v1(), value: 50},
]

const myExpenses: CategoryExpenseType = {
    [categoryID1]: expenses1,
    [categoryID2]: expenses2,
    [categoryID3]: expenses3,
    [categoryID4]: expenses4,
}

function App() {
    const [revenues, setRevenues] = useState<RevenueType[]>(myRevenues)
    const [wallets, setWallets] = useState<WalletType[]>(myWallets)
    const [categories, setCategories] = useState<CategoryType[]>(myCategories)
    const [expenses, setExpenses] = useState<CategoryExpenseType>(myExpenses)
    const [isAddRevenueVisible, setIsAddRevenueVisible] = useState(false)
    const [isAddWalletVisible, setIsAddWalletVisible] = useState(false)
    const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false)
    const [collapsedStatistic, setCollapsedStatistic] = useState(true)

    const revenuesCount = revenues.length
    const revenuesCurrentValue = revenues.reduce((acc, cur) => acc + cur.currentValue, 0)
    const revenuesMonthlyValue = revenues.reduce((acc, cur) => acc + cur.monthlySalary, 0)
    const availableCash = wallets.reduce((acc, curr) => acc + curr.currentValue, 0)
    let spentCash = 0

    for (const [_, value] of Object.entries(expenses)) {
        spentCash += value.reduce((acc, curr) => acc + curr.value, 0)
    }

    // BLL REVENUE
    const onAddNewRevenue = (title: string, monthlySalary: number) => {
        const newRevenue: RevenueType = {
            id: v1(),
            title,
            currentValue: 0,
            monthlySalary
        }
        setRevenues([newRevenue, ...revenues])
    }

    const onDeleteRevenue = (revenueID: string) => {
        setRevenues(revenues.filter(revenue => revenue.id !== revenueID))
    }

    const onChangeRevenueTitle = (revenueID: string, title: string) => {
        setRevenues(revenues.map(revenue => revenue.id === revenueID ? {...revenue, title} : revenue))
    }

    //BLL WALLET
    const onAddNewWallet = (title: string, currentValue: number) => {
        const newWallet: WalletType = {
            id: v1(),
            title,
            currentValue
        }
        setWallets([newWallet, ...wallets])
    }

    // BLL CATEGORY
    const onAddNewCategory = (title: string, limit: number) => {
        const categoryID = v1()
        const newCategory: CategoryType = {
            id: categoryID,
            title,
            limit
        }
        setCategories([newCategory, ...categories])
        setExpenses({...expenses,
            [categoryID]: []
        })
    }

    //BLL EXPENSES
    const onAddExpenses = (categoryID: string, walletID: string, value: number) => {
        setExpenses({...expenses, [categoryID]: [...expenses[categoryID], {id: v1(), value}]})
        setWallets(wallets.map(wallet => wallet.id === walletID
            ? {...wallet, currentValue: wallet.currentValue - value}
            : wallet
        ))
    }

    // UI
    const showAddRevenueForm = (value: boolean) => {
        setIsAddRevenueVisible(value)
    }
    const showAddWalletForm = (value: boolean) => {
        setIsAddWalletVisible(value)
    }
    const showAddCategoryForm = (value: boolean) => {
        setIsAddCategoryVisible(value)
    }

    return (
        <div>
            {!collapsedStatistic
                ? <Statistic
                    revenuesCount={revenuesCount}
                    revenuesCurrentValue={revenuesCurrentValue}
                    revenuesMonthlyValue={revenuesMonthlyValue}
                    availableCash={availableCash}
                    spentCash={spentCash}
                    isCollapsed={setCollapsedStatistic}
                />
                : <button className={'statisticBtn'} onClick={() => setCollapsedStatistic(false)}>Показать
                    статустику</button>
            }
            <div>
                <button onClick={() => showAddRevenueForm(true)}>Создать доход</button>
                {
                    isAddRevenueVisible && <AddForm
                        callBack={onAddNewRevenue}
                        isModalVisible={showAddRevenueForm}
                    />
                }
                {
                    revenues.length ? <Revenues
                            revenues={revenues}
                            deleteRevenue={onDeleteRevenue}
                            changeRevenueTitle={onChangeRevenueTitle}
                        />
                        : <div>У вас нет ни одного источника дохода :(</div>
                }
            </div>
            <div>
                <button onClick={() => showAddWalletForm(true)}>Создать кошелек</button>
                {
                    isAddWalletVisible && <AddForm
                        callBack={onAddNewWallet}
                        isModalVisible={showAddWalletForm}
                    />
                }
                <Wallets wallets={wallets}/>
            </div>
            <div>
                <button onClick={() => showAddCategoryForm(true)}>Создать категорию</button>
                {
                    isAddCategoryVisible && <AddForm
                        callBack={onAddNewCategory}
                        isModalVisible={showAddCategoryForm}
                    />
                }
                <ExpensesCategories
                    categories={categories}
                    expenses={expenses}
                    wallets={wallets}
                    addExpenses={onAddExpenses}
                />
            </div>
        </div>
    )
}

export default App
