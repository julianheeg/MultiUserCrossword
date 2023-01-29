import { FC, ReactNode } from 'react';
import { Container } from '@mui/material';
import NavMenu from './NavMenu';

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = props => {
    return (
        <div>
            <NavMenu />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

export default Layout;