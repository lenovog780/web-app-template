import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../../components/UI/NavMenu/NavMenu';

class Layout extends Component {
    render() {
        return (
            <div>
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

export default Layout;