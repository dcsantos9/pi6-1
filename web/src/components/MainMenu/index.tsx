import React , { ButtonHTMLAttributes } from 'react';
import { Menu } from './styles';

const MainMenu: React.FC = ({children, ...rest}) => (

    <Menu {...rest} >
            {children}
    </Menu>
    );

export default MainMenu;
