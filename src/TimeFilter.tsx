import * as React from 'react';
import * as lodash from 'lodash';

// const BarRange = () => {
//     return <div style={{
//         position: 'absolute',
//         top: -5,
//         bottom: -5,
//         left: 20,
//         right: 60,
//         backgroundColor: 'blue',
//         opacity: 0.5,
//     }}>
//     <div style={{
//         position: 'absolute',
//         left: 0,
//         width: 5,
//         backgroundColor: 'darkgreen',
//         height: '100%',
//     }} />
//     <div style={{
//         position: 'absolute',
//         right: 0,
//         width: 5,
//         height: '100%',
//         backgroundColor: 'darkgreen',
//     }} />
//     </div>
// }

export default class TimeRange extends React.Component {
    element: HTMLDivElement | null
    state = {
        left: 30,
        right: 60,
        isLeftMove: false,
        isRightMove: false,
        width: 0,
        leftOffset: 0,
        isMidMove: false,
        startMid: 0,
    }

    componentDidMount() {
        if (this.element) {
            const boundingBox = this.element.getBoundingClientRect();

            this.setState({ 
                width: boundingBox.width,
                leftOffset: boundingBox.left,
            }); 
        }

        this.startMoveLeft = this.startMoveLeft.bind(this);
        this.endMoveLeft = this.endMoveLeft.bind(this);
        this.startMoveRight = this.startMoveRight.bind(this);
        this.endMoveRight = this.endMoveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);

        this.startMoveMid = this.startMoveMid.bind(this);
        this.moveMid = this.moveMid.bind(this);
        this.endMoveMid = this.endMoveMid.bind(this);
    } 
    
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.endMoveLeft);
        window.removeEventListener('mouseup', this.moveLeft);
        window.removeEventListener('mousemove', this.endMoveRight);
        window.removeEventListener('mouseup', this.moveRight);
        window.removeEventListener('mousemove', this.endMoveMid);
        window.removeEventListener('mouseup', this.moveMid);
    }
    
    startMoveLeft = (e: React.MouseEvent<HTMLDivElement>) => {
        window.addEventListener('mousemove', this.moveLeft);
        window.addEventListener('mouseup', this.endMoveLeft);
    
        this.setState({isLeftMove: true})
        e.stopPropagation();
    };

    moveLeft = (e: MouseEvent) => {
        const { clientX } = e;
        const { isLeftMove } = this.state;

        if (!isLeftMove) {
          return;
        }
    
        this.setState({
            left: Math.max(0, Math.min(this.state.right / 100, (clientX - this.state.leftOffset) / this.state.width)) * 100,
        });
      };

    endMoveLeft() {
            window.removeEventListener('mousemove', this.moveLeft);
            window.removeEventListener('mouseup', this.endMoveLeft);
        
            this.setState(
              {
                isLeftMove: false
              }
            );
          }
    
    startMoveRight = (e: React.MouseEvent<HTMLDivElement>) => {
        window.addEventListener('mousemove', this.moveRight);
        window.addEventListener('mouseup', this.endMoveRight);
    
        this.setState({isRightMove: true})
        e.stopPropagation();
    };

    moveRight = (e: MouseEvent) => {
        const { clientX } = e;
        const { isRightMove } = this.state;

        if (!isRightMove) {
            return;
        }
    
        this.setState({
            right: Math.max(this.state.left / 100, Math.min(1, (clientX - this.state.leftOffset) / this.state.width)) * 100,
        });
    };

    endMoveRight() {
            window.removeEventListener('mousemove', this.moveRight);
            window.removeEventListener('mouseup', this.endMoveRight);
        
            this.setState(
            {
                isRightMove: false
            }
            );
        }
    
    startMoveMid = ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) => {
        window.addEventListener('mousemove', this.moveMid);
        window.addEventListener('mouseup', this.endMoveMid);

        // if (!this.state.isLeftMove && !this.state.isRightMove)
            this.setState({isMidMove: true, startMid: clientX})
    };

    moveMid = (e: MouseEvent) => {
        const { clientX } = e;
        const { isMidMove } = this.state;

        if (!isMidMove) {
            return;
        }
    
        const trueOffset = Math.min(100-this.state.right,
            Math.max(0 - this.state.left, (clientX - this.state.startMid) / this.state.width * 100));
        this.setState({
            left: this.state.left + trueOffset,
            right: this.state.right + trueOffset,
            startMid: clientX,
        });
    };

    endMoveMid() {
        window.removeEventListener('mousemove', this.moveMid);
        window.removeEventListener('mouseup', this.endMoveMid);
    
        this.setState(
        {
            isMidMove: false
        }
        );
    }

    render() {
        const nums = lodash.range(0, 25).map((x) => {
            return <div key={x} style={{
                position: 'absolute',
                left: `${100*x / 24}%`,
                width: 10,
                height: '100%',
                marginLeft: -5,
            }}>{x%3 === 0 ? x : ''}</div>
        })

        return <div style={{
            height: 40,
            backgroundColor: '#ccc',
            position: 'relative',
            margin: 10,
        }} ref={(element) => {this.element = element }}>
            {nums}
            <div style={{
        position: 'absolute',
        top: -5,
        bottom: -5,
        left: `${this.state.left}%`,
        right: `${100- this.state.right}%`,
        backgroundColor: 'blue',
        opacity: 0.5,
    }} onMouseDown={this.startMoveMid}>
    <div style={{
        position: 'absolute',
        left: 0,
        width: 8,
        marginLeft: -8,
        backgroundColor: 'darkgreen',
        height: '100%',
    }} onMouseDown={this.startMoveLeft} />
    <div style={{
        position: 'absolute',
        right: 0,
        width: 8,
        marginRight: -8,
        height: '100%',
        backgroundColor: 'darkgreen',
    }} onMouseDown={this.startMoveRight} />
    </div>
            </div>
    }
}