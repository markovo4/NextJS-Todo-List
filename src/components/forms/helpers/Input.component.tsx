import React, {FC} from "react";

export const InputComponent: FC<InputProps> = ({
                                                   value,
                                                   onChange,
                                                   errorMessage,
                                                   id,
                                                   type,
                                                   name,
                                                   label
                                               }) => {
    return (
        <div className={'flex flex-col'}>
            <label htmlFor={'email'}>{label}</label>
            <input
                className={'bg-white rounded-md  text-black px-1'}
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
            {errorMessage && <small className={'text-red-700 font-bold text-xs mt-1'}>{errorMessage}</small>}
        </div>
    )
}

export type InputProps = {
    value: string;
    onChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    label: string;
    id: string;
    type: string;
    name: string;
}