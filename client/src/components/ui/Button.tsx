import '../../styles/globals.css';

export const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    );
};