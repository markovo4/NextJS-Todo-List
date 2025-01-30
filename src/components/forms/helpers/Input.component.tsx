import React, {FC} from "react";
import clsx from "clsx";

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
        <div className="flex flex-col h-[55px] ">
            <div className={clsx(
                errorMessage ? "border-2 border-red-600 rounded-lg" : "rounded-lg"
            )}>
                <input
                    className={clsx(
                        "border-2 rounded-md bg-white text-black px-3 py-1 outline-none", // Always have a border
                        errorMessage
                            ? "border-red-500 focus:border-red-600" // Red border when there's an error
                            : "border-gray-300 focus:border-blue-500" // Default border color
                    )}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                />
            </div>

            {errorMessage && (
                <small className="text-red-600 font-medium text-xs mt-0.5 ml-1">
                    {errorMessage}
                </small>
            )}
        </div>
    );
};

export type InputProps = {
    value: string;
    onChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    label: string;
    id: string;
    type: string;
    name: string;
};
