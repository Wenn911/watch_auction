interface AppInputProps {
    placeholder?: string
}

export const AppInput = ({ placeholder = "" }: AppInputProps) => {
    return (
        <input 
            className="w-full placeholder:text-[rgb(161,161,170)] px-8 py-4 rounded-md border-solid border-2 border-(--button-primary)"
            inputMode="numeric"
            name="bid"
            placeholder={placeholder}
        />
    )
}