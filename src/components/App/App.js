import React, { Component } from 'react';

import Background from '../Background/Background';
import Card from '../Card/Card';
import Snowflakes from '../Snowflakes/Snowflakes';
import Fireworks from '../Fireworks/Fireworks';
import './App.scss';

class App extends Component {
    backgroundAudioRef = React.createRef();

    componentDidMount() {
        this.backgroundAudioRef.current.play();
    }

    componentWillUnmount() {
        this.backgroundAudioRef.current.pause();
    }

    render() {
        return (
            <div className="App">
                <div className="background-music">
                    <audio
                        preload="auto"
                        ref={this.backgroundAudioRef}
                        loop={true}
                    >
                        <source src="/lovesosweet.mp3" type="audio/mpeg" />
                    </audio>
                </div>
                <Background />
                <Fireworks />
                <Snowflakes />
                <Card />
            </div>
        );
    }
}

export default App;
