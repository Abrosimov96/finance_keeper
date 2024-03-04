import {ChangeEvent, useState} from 'react';
import './AddForm.css'

type AddFormProps = {
    callBack: (title: string, salary: number) => void
    isModalVisible: (value: boolean) => void
};
export const AddForm = ({callBack, isModalVisible}: AddFormProps) => {
    const [titleInputValue, setTitleInputValue] = useState('')
    const [salaryInputValue, setSalaryInputValue] = useState<number | ''>('')
    const [newError, setNewError] = useState<string | null>(null)

    const onChangeTitleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(e.currentTarget.value)
    }
    const onChangeSalaryInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSalaryInputValue(+e.currentTarget.value)
    }

    const newValue = () => {
        debugger
        if (!titleInputValue.trim()) {
            setNewError('Название обязательно!')
        } else {
            if (!salaryInputValue || salaryInputValue <= 0) {
                setNewError('Сумма должна быть больше 0!')
            } else {
                callBack(titleInputValue, salaryInputValue)
                setNewError(null)
                setTitleInputValue('')
                setSalaryInputValue('')
                isModalVisible(false)
            }
        }
    }

    return (
        <div className={'modalAddForm'} onClick={() => isModalVisible(false)}>
            <div className={'addForm'} onClick={e => e.stopPropagation()}>
                <label className={'addFormLabel'}>
                    Имя:
                    <input
                        type={'text'}
                        placeholder={'Введите имя'}
                        value={titleInputValue}
                        onChange={e => onChangeTitleInputValue(e)}/>
                </label>
                <label>
                    Ежемесячная сумма:
                    <input
                        type={'number'}
                        placeholder={'Введите сумму'}
                        value={salaryInputValue}
                        onChange={e => onChangeSalaryInputValue(e)}/>
                </label>
                {
                    newError
                        ? <div className={'error'}>{newError}</div>
                        : <></>
                }
                <button onClick={newValue}>+</button>
            </div>
        </div>
    );
};