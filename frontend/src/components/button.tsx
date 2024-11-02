import styles from "./button.module.scss";

export interface ButtonProps {
    name: string,
    type: "button" | "reset" | "submit",
    onClick?: () => void
}

export default function Button({ name, onClick, type }: ButtonProps) {
    return (
        <button
            onClick={() => onClick ? onClick() : () => { }}
            type={type}
            className={styles.container}>
            {name}
        </button>
    )
}