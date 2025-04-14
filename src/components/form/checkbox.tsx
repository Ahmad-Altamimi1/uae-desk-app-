import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Controller } from 'react-hook-form';

interface CustomCheckboxProps {
    name: string;
    label: string;
    control: any;
}

const CustomCheckbox = ({ name, label, control }: CustomCheckboxProps) => {
    return (
        <label htmlFor={name} className="cursor-pointer">
            <div className="flex items-center gap-2 p-1 rounded-md transition-colors peer-checked:bg-[#CBC02E]">
                <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Checkbox
                        id={name}
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        className="peer"
                    />
                )}
                />
         
                <span>{label}</span>
            </div>
        </label>
    )
}

export default CustomCheckbox
