import React, { Component } from 'react';
import './Background.scss';

export default class Background extends Component {
    cloudsRef = React.createRef();
    treesRef = React.createRef();
    grassRef = React.createRef();
    buildingsRef = React.createRef();

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseOver);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseOver);
    }

    handleMouseOver = e => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const offsetX = 0.5 - e.pageX / w;
        const offsetY = 0.5 - e.pageY / h;

        [
            this.cloudsRef,
            this.treesRef,
            this.grassRef,
            this.buildingsRef,
        ].forEach((ref, index) => {
            const el = ref.current;
            const offset = parseInt(el.getAttribute('data-offset'));
            const translate =
                'translate3d(' +
                Math.round(offsetX * offset) +
                'px,' +
                Math.round(offsetY * offset) +
                'px, 0px)';

            el.style['-webkit-transform'] = translate;
            el.style.transform = translate;
            el.style['moz-transform'] = translate;
        });
    };

    render() {
        return (
            <div className="Background">
                <div className="scene">
                    <div
                        data-offset="90"
                        className="clouds"
                        ref={this.cloudsRef}
                    />
                    <div
                        data-offset="30"
                        className="trees"
                        ref={this.treesRef}
                    />
                    <div
                        data-offset="20"
                        className="grass"
                        ref={this.grassRef}
                    />
                    <div
                        data-offset="50"
                        className="buildings"
                        ref={this.buildingsRef}
                    />
                    <div className="ground" />
                </div>
            </div>
        );
    }
}
