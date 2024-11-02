import styles from "./button.module.scss";

export interface ButtonProps {
    name: string,
    disabled?: boolean,
    type: "button" | "reset" | "submit",
    onClick?: () => void
}

export default function Button({ name, onClick, type, disabled }: ButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={() => onClick ? onClick() : () => { }}
            type={type}
            className={styles.container}>
            {name}
        </button>
    )
}