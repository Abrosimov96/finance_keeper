import './RevenueModal.css'
import {RevenueType} from '../../../../App.tsx';
import {EditableSpan} from '../../../EditableSpan/EditableSpan.tsx';

type RevenueModalProps = {
    revenue: RevenueType
    isModalVisible: (value: boolean) => void
    deleteRevenue: (revenueID: string) => void
    changeRevenueTitle: (revenueID: string, title: string) => void
};
export const RevenueModal = ({revenue, isModalVisible, deleteRevenue, changeRevenueTitle} : RevenueModalProps) => {
    const onSaveChanges = (value: string) => {
        if (value.trim()) {
            changeRevenueTitle(revenue.id, value)
        }
    }
    const onDeleteRevenue = () => {
        deleteRevenue(revenue.id)
        isModalVisible(false)
    }
    return (
        <div className={'modalFullRevenue'} onClick={() => isModalVisible(false)}>
            <div className={'fullRevenue'} onClick={e => e.stopPropagation()}>
                <EditableSpan value={revenue.title} saveChanges={onSaveChanges} />
                <p>{revenue.currentValue} лв.</p>
                <p>{revenue.monthlySalary} лв.</p>
                <button onClick={onDeleteRevenue}>Удалить доход</button>
            </div>
        </div>
    );
};