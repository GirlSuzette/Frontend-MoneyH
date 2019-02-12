import React, { Component } from "react";
import './dashboard.css'
import Card from '../MaterialComponents/Card'
import ExpensesImage from '../../image/expenses.jpg'

export default class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='dashboardContainer'>
                    <div className='container'>
                        <div className='row'>
                            <div className='frm col-sm-4'>
                                <Card cardTitle='Expenses' picture={ExpensesImage}>
                                    <div className='form-group'>
                                        <div class="row">
                                            <div class="col-6 colorGreen">Incomes</div>
                                            <div class="col- colorGreen">$20,000.00</div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div class="row">
                                            <div class="col-6 colorRed">Expenses</div>
                                            <div class="col-6 colorRed">$15,0000.00</div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div class="row">
                                            <div class="col-6 colorBlue">Saving Goal</div>
                                            <div class="col-6 colorBlue">$10,0000.00/$45,000.00</div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div class="row">
                                            <div class="col-6 colorPur">In General account</div>
                                            <div class="col-6 colorPur">$5,000.00</div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}