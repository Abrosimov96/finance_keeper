import {RevenueType} from '../../App.tsx';
import {Revenue} from './Revenue/Revenue.tsx';
import './Revenues.css'

type RevenuesProps = {
    revenues: RevenueType[]
    deleteRevenue: (revenueID: string) => void
    changeRevenueTitle: (revenueID: string, title: string) => void
};
export const Revenues = ({revenues, deleteRevenue, changeRevenueTitle}: RevenuesProps) => {
    return (
        <div className={'revenues'}>
            <ul className={'revenueList'}>
                {
                    revenues.map(revenue => <Revenue
                        key={revenue.id}
                        revenue={revenue}
                        deleteRevenue={deleteRevenue}
                        changeRevenueTitle={changeRevenueTitle}
                    />)
                }
            </ul>
        </div>
    );
};