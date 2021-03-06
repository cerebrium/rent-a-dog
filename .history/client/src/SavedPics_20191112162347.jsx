import React, { Component } from 'react';
import axios from 'axios'

class SavedPics extends Component {

    state = { 
        tokenVar: null,
        dogList: null
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
            console.log(response.data)
        })
        if (this.props.user) {
            axios.get(`/favourite/getuser/random/${this.props.user._id}`)
            .then(response => {
                this.setState({
                    dogList: response.data.favoriteDogs
                })
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.id.value)
        axios.get(`/favourite/${this.props.user._id}/${event.target.id.value}`)
        .then( response => {
            this.setState({
                dogList: response.data
            })
        })
    }

    render() { 
        if (this.state.dogList) {
            console.log(this.state.dogList)
            var mappedDogs = this.state.dogList.map((ele, id) => <div className='container'><form onSubmit={this.handleSubmit} className='formStyle'><p key={id} className='dogName'>{ele.name}<br /><div><img src={ele.photo} className='imageClass'></img></div></p>
                                                                    <input type="hidden" name="id" value={ele._id}/>
                                                                    <input type="submit" value="Delete" className='deleteButton'/>
                                                                    </form></div>)
        } else {
            var mappedDogs = 'loading favourites'
        }
        return ( 
            <div>
                <p > View Your Favourites!</p>
                {mappedDogs}
            </div>
        );
    }
}

export default SavedPics;