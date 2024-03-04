import {ChangeEvent, useState} from 'react';

type EditableSpanNumberProps = {
    value: number
    saveChanges: (value: number) => void
};
export const EditableSpanNumber = ({value, saveChanges}: EditableSpanNumberProps) => {
    const [editableMode, setEditableMode] = useState(false)
    const [inputValue, setInputValue] = useState<number | ''>(value)

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            setInputValue(+e.currentTarget.value)
        } else {
            setInputValue('')
        }
    }

    const onSaveChanges = () => {
        if (inputValue) {
            saveChanges(inputValue)
            setEditableMode(false)
        }
    }
    return (
        editableMode
            ? <input
                autoFocus
                type={'number'}
                value={inputValue}
                onBlur={onSaveChanges}
                onChange={e => onChangeInputValue(e)}
            />
            : <h3 onDoubleClick={() => setEditableMode(true)}>{value}</h3>

    );
};