import React, {Component} from 'react';

class Dashboard extends Component {

    state = {
        petName: '',
        petColor: '',
        petBreed: '',
        owner: ''
    }

    handleChange = (typeOf, value) => {
        this.setState({
            [typeOf]: value
        })
        
    }

    handleSubmit = () => {
        console.log('clicked');
    }

    render(){
        return (
            <div className="dashboard">
                <div>Add Pet</div>
                <div className="inputWrapper">
                    <input placeholder="Pet Name" onChange={(event)=>{this.handleChange('petName', event.target.value)}}/>
                    <input placeholder="Pet Color" onChange={(event)=>{this.handleChange('petColor', event.target.value)}}/>
                    <input placeholder="Pet Breed" onChange={(event)=>{this.handleChange('petBreed', event.target.value)}}/>
                </div>
                <button onClick={this.handleSubmit}></button>
            </div>
        )
    }
}

export default Dashboard;