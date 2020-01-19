import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/ChekoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export class Checkout extends Component {
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        
        if(this.props.ings) {            
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;

            summary = (
                <div>
                    { purchasedRedirect }

                    <CheckoutSummary ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);

// due to the way we load the ContactData component by rendering it manually, we dont have the history Object available in there
// we can solve this in one of two ways: 1. by wrapping the ContactData component with the withRouter Object
// 2. by passing and spreading props on the Route for the ContactData component