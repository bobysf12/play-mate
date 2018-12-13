import * as React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

interface ButtonProps {
    open: () => void
}

const ListViewButton = (props: ButtonProps) => {
    return <div style={{
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        zIndex: 11,
    }} onClick={props.open}>
        <Button style={{backgroundColor: 'darkgreen', color: '#fff'}}>List View</Button>
    </div>
}

interface ListProps {
    close: () => void
}

class List extends React.Component<ListProps> {
    state = {
        opacity: 0.3,
        y: 50,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                opacity: 1,
                y: 0,
            })
        }, 100);

        this.close = this.close.bind(this);
    }

    close() {
        this.setState({
            opacity: 0.3,
            y: 50,
        })
        setTimeout(() => {
            this.props.close();
        }, 800);
    }

    render() {
        return <Paper style={{
            transition: 'opacity 1s, transform 1s',
            opacity: this.state.opacity,
            transform: `translateY(${this.state.y}px)`,
            position: 'absolute',
            top: 180,
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 11,
        }} onClick={this.close}>
            List View</Paper>
    }
}

// tslint:disable-next-line
export default class ListView extends React.Component {
    state = {
        isOpen: false,
    }

    componentDidMount() {
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({ isOpen: true });
    }

    close() {
        this.setState({ isOpen: false })
    }

    render() {
        if (!this.state.isOpen) {
            return <ListViewButton open={() => this.open()} />
        }

        return <List close={() => this.close()} />;
    }
}
