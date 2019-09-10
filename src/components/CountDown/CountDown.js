import React, { Component } from 'react';
import Countdown from 'react-countdown-now';

class CountDown extends Component {

    render() {

        const futureDate = 1581717600000;

        let currentDate = Date.now();

        let dateDifference = futureDate - currentDate;

        // Random component
        const Completionist = () => <span>Trivia 2020 has started!  Good luck, trivia players!</span>;

        // Renderer callback with condition
        const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (days === 1) {
                days = days += ' day'
            } else {
                days = days += ' days'
            }

            if (hours === 1) {
                hours = hours += ' hour'
            } else {
                hours = hours += ' hours'
            }

            if (minutes === 1) {
                minutes = minutes += ' minute'
            } else {
                minutes = minutes += ' minutes'
            }

            if (seconds === 1) {
                seconds = seconds += ' second'
            } else {
                seconds = seconds += ' seconds'
            }

            if (completed) {
                // Render a completed state
                return <Completionist />
            } else {
                // Render a countdown
                return <span>{days}, {hours}, {minutes}, and {seconds} until Trivia 2020!</span>;
            }
        };

        return (

            <Countdown
                date={Date.now() + dateDifference}
                renderer={renderer}
            />)
    }
}


export default CountDown;
