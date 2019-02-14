import React, { Component } from 'react';
import './Income.css'


export default class ListIncomes extends Component {

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
                                        <div class="col-12 colorGreen ">January income 2019 $ 20,342.43</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Recibido</th>
                                <th scope="col">Concept</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row"><input class="form-check-input" type="checkbox" value="" id="defaultCheck1" /></td>
                                <td>Sueldo</td>
                                <td>$ 15,000.00</td>
                                <td>2019-01-01</td>
                            </tr>
                            <tr>
                                <th scope="row"><input class="form-check-input" type="checkbox" value="" id="defaultCheck1" /></th>
                                <td>Frelancer</td>
                                <td>$ 5,000.00</td>
                                <td>2019-01-02</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </React.Fragment>
        );
    }
}