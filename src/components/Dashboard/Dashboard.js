import React, {Component} from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {

    state = {
        petName: '',
        petColor: '',
        petBreed: '',
        owner: '',
        checkedIn: false
    }

    componentDidMount = () => {
        this.props.dispatch ({ type: 'GET_PETS'})
    }

    handleChange = (typeOf, value) => {
        this.setState({
            [typeOf]: value
        })
        console.log('this.state', this.state);
    }

    handleSubmit = () => {
        this.props.dispatch({
            type: 'ADD_PET',
            payload: {
                petName: this.state.petName,
                petBreed: this.state.petBreed,
                petColor: this.state.petColor,
            }
        });
        this.props.dispatch ({ type: 'GET_PETS'})
    }

    handleCheckIn = () => {
        console.log('handleCheckIn', this.state.checkedIn);
        this.setState({
            checkedIn: !this.state.checkedIn
        })
    }

    handleDelete = () => {
        console.log('delete');
        this.props.dispatch({ type: 'DELETE_PET'})
        this.props.dispatch({ type: 'ADD_PET' })
    }

    render(){
        return (
            <div>
                <h1><em>Dashboard View</em></h1>
                <header>Pet Hotel</header>
                <table>
                    <tr>
                        <th>Dashboard</th>
                        <th>Manage Owners</th>
                    </tr>
                </table>

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
                        <tr>
                            <th>Owner</th>
                            <th>Pet</th>
                            <th>Breed</th>
                            <th>Color</th>
                            <th>Checked In</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.petsReducer &&
            
                        this.props.reduxState.petsReducer.map((pet)=> (

                            <tr>
                                <td>{pet.ownerName}</td>
                                <td>{pet.petName}</td>
                                <td>{pet.breed}</td>
                                <td>{pet.color}</td>
                                {this.state.checkedIn === false ?
                                <td>no</td> :
                                <td>{pet.checkedInDate}</td>}
                                <td><button onClick={this.handleDelete}>Delete</button></td>

                                <td>
                                    {this.state.checkedIn === false ? 
                                    <button onClick={this.handleCheckIn}>Check In</button> :
                                    <button onClick={this.handleCheckIn}>Check Out</button>
                                }
                                </td>   
                            </tr>
                        ))}
                    </tbody>
                </table>
                                {/* DELETE THIS TEST ONCE TABLE RENDERS */}
                                <div className="test">
                                    {this.state.checkedIn === false ? 
                                    <button onClick={this.handleCheckIn}>Check In</button> :
                                    <button onClick={this.handleCheckIn}>Check Out</button>
                                }
                                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
})
export default connect(mapStateToProps)(Dashboard);