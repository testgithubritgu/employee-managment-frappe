import  { useState } from 'react';
import Select from 'react-select';

interface StateManagement {
    value: string;
    label: string;
}

const options: StateManagement[] = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" }
];

export default function SelectDropdown() {
    const [selectedOption, setSelectedOption] =
        useState<StateManagement | null>(options[0]);

    return (
        <div className="App">
            <Select
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                options={options}
                isSearchable={false}/>
        </div>
    );
}