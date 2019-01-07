import React, { Component } from 'react';
import classNames from 'classnames';
import './Card.scss';
import { Button } from '../Button/Button';
import aihaibara from './aihaibara.png';

const CardState = Object.freeze({
    Close: 0,
    CloseHalf: 1,
    OpenHalf: 2,
    Open: 3,
});

// Speed of open/close
// DO not change since it is fixed by css as well
const CARD_MOVE_SPEED = 1000;

export default class Card extends Component {
    timer = null;
    state = {
        cardState: CardState.Close,
    };

    handleCardClose = () => {
        this.setState(
            {
                cardState: CardState.CloseHalf,
            },
            () => {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.setState({
                        cardState: CardState.Close,
                    });
                    this.timer = null;
                }, CARD_MOVE_SPEED);
            }
        );
    };

    handleCardOpen = () => {
        this.setState(
            {
                cardState: CardState.OpenHalf,
            },
            () => {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.setState({
                        cardState: CardState.Open,
                    });
                    this.timer = null;
                }, CARD_MOVE_SPEED);
            }
        );
    };

    render() {
        const { cardState } = this.state;

        const cardClassName = classNames({
            Card: true,
            'open-fully': cardState === CardState.Open,
            'open-half': cardState === CardState.OpenHalf,
            'close-half': cardState === CardState.CloseHalf,
            'close-fully': cardState === CardState.Close,
        });

        const cardTitle = process.env.REACT_APP_CARD_TITLE;
        const message = process.env.REACT_APP_MESSAGE;
        const signature = process.env.REACT_APP_SIGNATURE;

        return (
            <div className={cardClassName}>
                <div className="card-inside">
                    <div className="card-content">
                        <div dangerouslySetInnerHTML={{ __html: message }} />
                        <p className="card-signature">{signature}</p>
                    </div>
                </div>

                <div className="card-front">
                    <div
                        className="card-content"
                        onClick={
                            cardState == CardState.Close
                                ? this.handleCardOpen
                                : cardState == CardState.Open
                                ? this.handleCardClose
                                : null
                        }
                    >
                        <div className="card-front-front">
                            <h1 className="card-title">{cardTitle}</h1>
                        </div>
                        <div className="card-front-back">
                            <img
                                src={aihaibara}
                                width="200px"
                                className="card-sticker"
                                alt="Ai Haibara Sticker"
                            />
                        </div>
                    </div>
                    <Button
                        className="open CardButton"
                        onClick={this.handleCardOpen}
                    >
                        &gt;
                    </Button>
                    <Button
                        className="close CardButton"
                        onClick={this.handleCardClose}
                    >
                        &lt;
                    </Button>
                </div>
            </div>
        );
    }
}
