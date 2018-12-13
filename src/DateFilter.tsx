import * as React from 'react';
import * as lodash from 'lodash';

interface DateItemProps {
    // x: number,
    act: number,
    // sunday: Date,
    active: boolean,
    disabled: boolean,
    onClick: () => void,
    // offset: number,
    date: Date,
    // width: number,
}

function formatDate(d: Date) {
    const dst = d.toDateString().split(' ');
    return <div><div style={{fontSize: 12}}>{dst[0]}</div><div style={{fontSize: 16, fontWeight: 600}}>{dst[2]}</div>
    <div style={{fontSize: 12, fontWeight: 300}}>{dst[1]}</div></div>;
}

const DateItem = (props: DateItemProps) => {
    return <div style={{
        flex: 1,
        fontSize: '10pt',
        width: 90,
        backgroundColor: '#fff',
        border: props.active ? '1px solid #0770cd' : '1px solid rgba(0,0,0,.3)',
        color: props.active ? '#0770cd' : '#000',
        textAlign: 'center',
        position: 'relative',
        }} onClick={props.onClick}>
        {formatDate(props.date)}
        <div style={{padding: 4,
    backgroundColor: '#f6f6f6', display: 'flex',     borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
}}>
        <span style={{
            flex: 1,
            display: 'block',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    }}>{props.act <= 0 ? 'No' : props.act} activity</span></div>
    </div>
}

// function getSunday() {
//     const d = new Date();
//     d.setDate(d.getDate() - d.getDay());
//     return d;
// }

interface ButtonProps {
    color: string;
    onClick: () => void;
}

const LeftButton = (props: ButtonProps) => {
    return <div onClick={props.onClick} style={{
        zIndex: 11,
        border: '1px solid #dadada',
        display: 'flex',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,}}><svg strokeWidth="1.5" viewBox="0 0 16 16" color="#0770CD" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round"><g transform="translate(4.033325, 0.166667)"><path d="M0.488888889,7.33333333 L7.33333333,0.488888889" /><path d="M0.488888889,7.33333333 L7.33333333,14.1777778" /></g></svg></div>;
}

const RightButton = (props: ButtonProps) => {
    return <div onClick={props.onClick} style={{
        zIndex: 11,
        border: '1px solid #dadada',
        display: 'flex',
        alignItems: 'center',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,}}><svg strokeWidth="1.5" viewBox="0 0 16 16" color="#0770CD" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round"><g transform="translate(4.033325, 0.166667)"><path d="M7.33333333,7.33333333 L0.488888889,0.488888889" /><path d="M7.33333333,7.33333333 L0.488888889,14.1777778" /></g></svg></div>;
}

// function isSameDate(d1: Date, d2: Date) {
//     return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
// }

function addDate(d: Date, x: number) {
    const sunday = new Date(d);
    sunday.setDate(sunday.getDate() + x);
    return sunday;
}

export default class DateFilter extends React.Component {
    state = {
        // minOffset: 0,
        // maxOffset: 0,
        today: new Date(),
        selectedIdx: 0,
        offset: 0,
    }

    componentDidMount() {
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.selectDate = this.selectDate.bind(this);
    }

    moveLeft() {
        this.setState({
            offset: this.state.offset - 1,
            // minOffset: this.state.offset <= this.state.minOffset ? this.state.minOffset - 1 : this.state.minOffset,
        })
    }

    moveRight() {
        this.setState({
            offset: this.state.offset + 1,
            // maxOffset: this.state.offset >= this.state.maxOffset ? this.state.maxOffset + 1 : this.state.maxOffset,
        })
    }

    selectDate(x: number) {
        this.setState({ selectedIdx: x});
    }

    render() {
        const dates = lodash.map(lodash.range(3), (x) => {
            const d = this.state.offset * 3 - 1 + x;
            return <DateItem
            key={d}
            act={7}
            onClick={() => this.selectDate(d)}
            date={addDate(this.state.today, d)}
            active={this.state.selectedIdx === d} disabled={false} />
        });

        return <div style={{flexDirection: 'row', display: 'flex', padding: 4, cursor: 'pointer'}}>
            <LeftButton color={'#B4B4B4'} onClick={() => this.moveLeft()} />
            {dates}
            <RightButton color={'#B4B4B4'} onClick={() => this.moveRight()}/>
        </div>
    }
}
