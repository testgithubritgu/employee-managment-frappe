
import Select from "react-select";
import { twMerge } from "tailwind-merge";

interface optinosInterface {
    value?: any,
    label?: any,
    isDisabled?: boolean
}
interface ChildSelectDropdownProps {
    selectedValue?: any;
    onChange: (value: optinosInterface) => void;
    options: any;
    className?: any;
    label?: any;
    name?: any;
    searchable?: boolean;
    onInputChange?: (value: string) => void;
}

export default function SelectDropdown({
    selectedValue = "",
    onChange,
    options,
    className,
    label,
    name,
    searchable = false,
    onInputChange,
}: ChildSelectDropdownProps) {


    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: "0.5rem",
            borderColor: state.isFocused ? "#8C8C8C" : "#E5E7EB", // subtle gray border
            boxShadow: state.isFocused
                ? "0 0 0 2px rgba(0, 0, 0, 0.1)" // soft focus ring
                : "0 1px 2px rgba(0, 0, 0, 0.05)",
            "&:hover": { borderColor: "#D1D5DB" },
            backgroundColor: "#FFFFFF",
            transition: "all 0.15s ease",
            padding: "2px 4px",
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isDisabled
                ? "#F9FAFB"
                : state.isSelected
                    ? "#F1F5F9"
                    : state.isFocused
                        ? "#F8FAFC"
                        : "#FFFFFF",
            color: state.isDisabled
                ? "#A3A3A3"
                : state.isSelected
                    ? "#525252"
                    : "#737373",
            cursor: state.isDisabled ? "not-allowed" : "pointer",
            "&:active": {
                backgroundColor: !state.isDisabled ? "#E5E7EB" : undefined,
            },
            fontSize: "0.8125rem",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "#737373",
        }),
        menu: (provided: any) => ({
            ...provided,
            borderRadius: "0.5rem",
            boxShadow:
                "0 2px 8px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.08)",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",

        }),
    };
    return (
        <div className={twMerge("md:w-64  text-sm", className)}>
            <label className="block text-sm font-medium text-neutral-600" htmlFor="">{label}</label>
            <Select
                name={name}
                value={options.find((c: any) => c.label === selectedValue)}
                onChange={(option) => option && onChange(option)}
                options={options}
                onInputChange={(value) => {
                    if (onInputChange) onInputChange(value);
                }}
                styles={{
                    ...customStyles,
                    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
                }}
                menuPortalTarget={document.body}
                isSearchable={searchable}
                // placeholder={options[0]?.label || "<--Select Category-->"}
                className="z-9999"

            />
        </div>
    );
}