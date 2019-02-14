import React, { Component } from "react";
import './dashboard.css'
import imgGraf from '../../image/chartjs.png'

export default class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <div class='container marginDash'>
                    <div class="row">
                    </div>
                    <h5 className='textDash'>General information				</h5>
                    <div class="jumbotron">
                        <div class="row">
                            <div class="col-md-6">
                                <div className='form-group'>
                                    <div class="row">
                                        <div class="col-6 colorGreen">Incomes</div>
                                        <div class="col-6 colorGreen">$20,000.00</div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div class="row">
                                        <div class="col-6 colorRed">Expenses</div>
                                        <div class="col-6 colorRed">$15,0000.00</div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-5">
                                <div className='form-group'>
                                    <div class="row">
                                        <div class="col-6 colorBlue">Saving Goal</div>
                                        <div class="col-6 colorBlue">$10,0000.00/<br />$45,000.00</div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div class="row">
                                        <div class="col-6 colorPur">In General account</div>
                                        <div class="col-6 colorPur">$5,000.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h2 class='jumbotron text-center colorGreen'>							Incomes				</h2>
                            <img class='img-responsive' src={imgGraf} />

                        </div>
                        <div class="col-md-6">
                            <h2 class='jumbotron text-center colorRed'>						Expenses				</h2>
                            <img class='img-responsive' src={imgGraf} />

                        </div>
                        <div class="col-md-6 colorBlue">
                            <h2 class='jumbotron text-center colorBlue'>							Graphs for expenses				</h2>
                            <img class='img-responsive' src={imgGraf} />

                        </div>
                    </div>
                </div>

            </React.Fragment >

        );
    }
}