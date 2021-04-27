import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';

import 'globals.styl'
import styles from './App.styl';

import { apiGET } from './utils/fetch';

class App extends PureComponent {

    async componentDidMount () {
        console.log(
            'apiGET example:',
            await apiGET('products', {
                limit: 5,
                filters: {
                    name: 'apple',
                    'nutrition.calories': '> 100',
                },
            })
        );
    }

    render () {
        return (
            <div className={styles.root}>
                App Root
            </div>
        );
    }

}

export default hot(App);
