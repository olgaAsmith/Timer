import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button type
   */
  buttonType: 'colored' | 'transparent';
  /**
   * Button color
   */
  color?: 'green' | 'orange' | 'grey';
  /**
   * Text on button or its elements
   */
  children?: ReactNode;
}

const Button: FC<Button> = ({ color, children, buttonType, ...props }) => {
  const buttonClass =
    buttonType === 'colored'
      ? `button__colored button__colored--${color}`
      : 'button--transparent';

  return (
    <button {...props} className={`button ${buttonClass}`}>
      {children}
    </button>
  );
};

export default Button;
