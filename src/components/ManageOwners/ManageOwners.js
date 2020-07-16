import React, {Component} from 'react';
import { connect } from 'react-redux';

class ManageOwners extends Component {

    state = {
        newOwner: ''
    }

    componentDidMount = () => {
        console.log('hi');
        // Rename SAGAS to whatever Jay has them as
        this.props.dispatch({ type: 'GET_OWNERS' })
    }

    handleChange = (event) => {
        this.setState({
            // ...this.state, ????
            newOwner: event.target.value
        })
        console.log('this.state', this.state.newOwner);
        
    }

    submit = () => {
        console.log('submit clicked');
        this.props.dispatch({
            type: 'ADD_OWNER',
            payload: {
                newOwner: this.state.newOwner
            }
        });
        this.props.dispatch({ type: 'GET_OWNERS' })
    }

    delete = () => {
        console.log('delete clicked');
        this.props.dispatch({ type: 'DELETE_OWNER'})
        this.props.dispatch({ type: 'GET_OWNERS' })
    }

    render(){
        return(
            <div>
                <h1><em>Manage Owners View</em></h1>
                <header>Pet Hotel</header>
                <table>
                    <tr>
                        <th>Dashboard</th>
                        <th>Manage Owners</th>
                    </tr>
                </table>

                <form>
                    <label>Add Owner</label>
                    <input placeholder="Owner name" onChange={this.handleChange}></input>
                    <button onClick={this.submit}>Submit</button>
                </form>
                <h2>Owners</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Number of Pets</th>
                        <th>Actions</th>
                    </tr>
                    {this.props.reduxStore.owner.map(item =>
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.numberOfPets}</td>
                        <td><button onClick={this.delete}>Delete</button></td>
                    </tr>
                    )}
                </table>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore });
export default connect(mapStateToProps)(ManageOwners);