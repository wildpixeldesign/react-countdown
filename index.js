import React, { Component } from 'react';
import moment from 'moment';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class CountdownTimer extends Component {
    constructor(props) {
        super(props);

        const {
            onRender = () => {},
            onUpdate = () => {}
        } = props || {};

        this.onRender = onRender;
        this.onUpdate = onUpdate;
    }

    clear() {
        this.clearInterval(this.timer);
    }

    timeRemaining() {
        const now = moment();
        const difference = moment(this.props.endsAt).unix() - now.unix();
        const duration = moment.duration(difference * 1000, 'milliseconds');

        return Object.assign({ duration }, duration['_data']);
    }

    tick() {
        const remaining = this.timeRemaining();
        this.onUpdate(remaining);

        if (remaining.duration.asSeconds() <= 0) {
            this.setState({ complete: true });
            return this.clear();
        }
    }

    componentDidMount() {
        this.timer = this.setInterval(this.tick, 1000);
    }

    render() { return this.onRender(this.state); }
}

reactMixin(CountdownTimer.prototype, TimerMixin);

export default CountdownTimer;
