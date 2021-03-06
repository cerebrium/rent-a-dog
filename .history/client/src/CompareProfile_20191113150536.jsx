import axios from 'axios';
import React from 'react';

class CompareProfile extends React.Component {

    state = {
        dogList: []
    }

    componentDidMount = () => {
        axios.get('/counter')
        .then(response => {
            this.setState({
                dogList: response.data
            })
        })
    }

    render () {
        if (this.state.dogList) {
            var myDogObj = new Object();
            var mappedDogs = this.state.dogList.map((dog, id) => <p key={id}>{dog}</p>)
            const result = words.filter(function(item, index) {
                if (words.indexOf(item) === index) {
                    return myDogObj['item'+item] = 1
                } else {
                    return myDogObj['item'+item] = myObj['item'+item] += 1
                }
            })
        } else {
            var mappedDogs = 'loading dog comparison'
        }
        return (
            <div>
                <h1>Compare Route</h1>
                {mappedDogs}
            </div>
        )
    }
}

export default CompareProfile