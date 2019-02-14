import React, { Component } from 'react';
import './Savings.css'


export default class ListSavings extends Component {

    render() {
        return (
            <React.Fragment>
                <div class='container marginlist'>
                    <div class="row">
                    </div>
                    <div class="jumbotron">
                        <div class="row">
                            <div class="col-md-6 text-center">
                                <div className='form-group'>
                                    <div class="row">
                                        <div class="col-12 colorBlue ">Savings goal Car hitch $ 75,342.43/100,000.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Ahorrado</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row"><input class="form-check-input" type="checkbox" value="" id="defaultCheck1" /></td>
                                <td>$ 8333.33</td>
                                <td>2019-01-01</td>
                            </tr>
                            <tr>
                                <th scope="row"><input class="form-check-input" type="checkbox" value="" id="defaultCheck1" /></th>
                                <td>$ 8333.33</td>
                                <td>2019-01-02</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </React.Fragment>
        );
    }
}