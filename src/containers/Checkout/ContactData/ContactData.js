import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        loading: false
    }

    orderHander = (event) => {
        event.preventDefault();


        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'Jopi',
                address: {
                    street: 'teststreet 12',
                    city: 'Rosenheim'
                },
                email: 'test@test.de'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(e => {
                this.setState({ loading: false });
            });

    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="your Email" />
            <input className={classes.Input} type="text" name="street" placeholder="street" />
            <input className={classes.Input} type="text" name="postal" placeholder="postal" />
            <Button btnType="Success" clicked={this.orderHander}>ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contac Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;