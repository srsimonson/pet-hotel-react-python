import React, {Component} from 'react';
import { connect } from 'react-redux';

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
                <div className="addPet">
                <div>Add Pet</div>
                <div className="inputWrapper">
                    <input placeholder="Pet Name" onChange={(event)=>{this.handleChange('petName', event.target.value)}}/>
                    <input placeholder="Pet Color" onChange={(event)=>{this.handleChange('petColor', event.target.value)}}/>
                    <input placeholder="Pet Breed" onChange={(event)=>{this.handleChange('petBreed', event.target.value)}}/>
                    {this.props.reduxState.ownerReducer && 
                    <select className="chooseOwnerName" onChange={(event)=>{this.handleChange('owner', event.target.value)}}>
                        {this.props.reduxState.ownerReducer.map((owner)=>(
                            <option value={owner.id}>{owner.name}</option>
                        ))}
                    </select>
                    }    
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                </div>
            <table>
                <thead>
                    <tr><th>Owner</th></tr>
                    <tr><th>Pet</th></tr>
                    <tr><th>Breed</th></tr>
                    <tr><th>Color</th></tr>
                    <tr><th>Checked In</th></tr>
                    <tr><th>Actions</th></tr>
                </thead>
                <tbody>
                    {this.props.reduxState.petsReducer &&
                    <>
                    {this.props.reduxState.petsReducer.map((pet)=> (

                        <tr>
                            <td>{pet.ownerName}</td>
                            <td>{pet.petName}</td>
                            <td>{pet.breed}</td>
                            <td>{pet.color}</td>
                            <td>{pet.checkedIn}</td>
                            <td><button onClick={this.handleDelete}>Delete</button></td>
                        </tr>
                    ))}
                    </>
                    }
                </tbody>
            </table>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
})
export default connect(mapStateToProps)(Dashboard);