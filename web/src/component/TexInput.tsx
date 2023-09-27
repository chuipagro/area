import { Input } from "@chakra-ui/react";


interface InputProps {
    setValue: (value: string) => void;
    placeHolder: string;
    type: "text" | "email" | "password" | "file";
    color: string;
}

export function InputText({ setValue, placeHolder, type, color }: InputProps): JSX.Element {

    return (
        <Input
            pr='4.5rem'
            type={type}
            color={color}
            placeholder={placeHolder}
            onChange={e => setValue(e.target.value)}
        />
    );
}