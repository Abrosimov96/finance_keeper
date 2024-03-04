import {RevenueType} from '../../../App.tsx';
import {useState} from 'react';
import {RevenueModal} from './RevenueModal/RevenueModal.tsx';
import './Revenue.css'

type RevenueProps = {
    revenue: RevenueType
    deleteRevenue: (revenueID: string) => void
    changeRevenueTitle: (revenueID: string, title: string) => void
};
export const Revenue = ({revenue, deleteRevenue, changeRevenueTitle}: RevenueProps) => {
    const [isFullRevenueVisible, setIsFullRevenueVisible] = useState(false)

    const fullRevenueVisible = (value: boolean) => {
        setIsFullRevenueVisible(value)
    }

    return (
        <>
            <li
                className={'revenueItem'}
                key={revenue.id}
                onClick={() => fullRevenueVisible(true)}
            >
                <span>{revenue.title} </span>
                <span>{revenue.currentValue} лв. </span>
                <span>{revenue.monthlySalary} лв.</span>
            </li>
            {
                isFullRevenueVisible
                    ? <RevenueModal
                        revenue={revenue}
                        isModalVisible={fullRevenueVisible}
                        deleteRevenue={deleteRevenue}
                        changeRevenueTitle={changeRevenueTitle}
                    />
                    : <></>
            }
        </>
    );
};