import React from 'react'
import Topbar from '../../components/topbar'

import './app.scss'

export default class App extends React.Component {
    constructor() {
        super()
        
    }

    getTemperatures() {
        
    }

    render() {
        return (
            <div className="wn_app">
                <Topbar />
                <main>
                    
                </main>
            </div>
        )
    }
}