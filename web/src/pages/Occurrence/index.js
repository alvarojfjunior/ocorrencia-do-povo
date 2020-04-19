import React from 'react';

import { connect } from 'react-redux';

import './styles.css';

import AppBar from '../../components/AppBar'

function Occurrence(props) {

    return (
        <div>
            <AppBar></AppBar>
            <div className="occurrence-container">
                <img src="https://cdn-istoedinheiro-ssl.akamaized.net/wp-content/uploads/sites/17/2020/03/cdbab406b5f84549439b68d43f62a7c31154c55a-768x432.jpg" alt="Occurrence" />
                <h2>Acidente deixa três feridos próximo a rodoviária de Montes Claros.</h2>
                <p>
                    Aliquam arcu ex, ds imperdiet sit amet lorem. Cras maximus, a vulputate lacus lobortis a. Mauris vitae justo sit amet nisl luctus vulputate a vel ligula. Duis placerat tempus tellus, vitae aliquam velit condimentum ut
                    Aliquam arcu ex, ds imperdiet sit amet lorem. Cras maximus, a vulputate lacus lobortis a. Mauris vitae justo sit amet nisl luctus vulputate a vel ligula. Duis placerat tempus tellus, vitae aliquam velit condimentum ut
                    Aliquam arcu ex, ds imperdiet sit amet lorem. Cras maximus, a vulputate lacus lobortis a. Mauris vitae justo sit amet nisl luctus vulputate a vel ligula. Duis placerat tempus tellus, vitae aliquam velit condimentum ut
                </p>
            </div>

        </div>
    );
}

export default connect(state => ({ state }))(Occurrence);