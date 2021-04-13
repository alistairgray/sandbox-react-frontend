import {useState} from 'react';

export function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    return [
        {value, onChange: (ev) => setValue(ev.target.value)},
        () => setValue(initialValue)
    ];
}