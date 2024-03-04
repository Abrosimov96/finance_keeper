import {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    value: string
    saveChanges: (value: string) => void
};
export const EditableSpan = ({value, saveChanges}: EditableSpanProps) => {
    const [editableMode, setEditableMode] = useState(false)
    const [inputValue, setInputValue] = useState(value)

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onSaveChanges = () => {
        if (inputValue.trim()){
            saveChanges(inputValue)
        } else {
            setInputValue(value)
        }
        setEditableMode(false)
    }
    return (
        editableMode
            ? <input
                autoFocus
                value={inputValue}
                onBlur={onSaveChanges}
                onChange={e => onChangeInputValue(e)}
            />
            : <h3 onDoubleClick={() => setEditableMode(true)}>{value}</h3>

    );
};