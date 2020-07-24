import React, { useState } from "react";
import axios from 'axios';
import StatusCard from './card'


export default class Base extends React.Component {
    state = {
        information: []
    }
    componentDidMount() {
        axios.get('http://localhost:3000/members')
            .then(res => {
                this.setState({ information: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div >
                {this.state.information.map((value) => {
                    return <div className="inline" key={value.id}>
                        <StatusCard
                            id={value.id}
                            name={value.real_name}
                            time={value.activity_periods}
                        />
                    </div>
                })}
            </div>
        )
    }
}