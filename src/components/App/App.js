import React, { Component } from 'react';

import Background from '../Background/Background';
import Card from '../Card/Card';
import Snowflakes from '../Snowflakes/Snowflakes';
import Fireworks from '../Fireworks/Fireworks';
import './App.scss';

class App extends Component {
    backgroundAudio = null;

    componentDidMount() {
        this.backgroundAudio = new Audio('/lovesosweet.mp3');
        this.backgroundAudio.play();
    }

    componentWillUnmount() {
        this.backgroundAudio.pause();
    }

    render() {
        return (
            <div className="App">
                <Background />
                <Fireworks />
                <Snowflakes />
                <Card />
            </div>
        );
    }
}

export default App;
