import { ICON } from 'types';

import './index.css';

interface MenuItemProps {
  icon: ICON;
  selected?: boolean;
  onClick: () => void;
}

export const MenuItem = ({
  icon,
  onClick,
  selected = false,
}: MenuItemProps) => {
  return (
    <div
      className={`menu-item ${selected && 'selected'}`}
      key={icon.name}
      onClick={onClick}
    >
      <img src={icon.path} className="menu-icon" alt={icon.name} />
    </div>
  );
};
