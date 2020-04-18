import React from 'react'

import { useHistory } from "react-router-dom";

import './styles.css';

function ListOccurrences() {
    const history = useHistory();
    
    function handleClickCard() {
        history.push("/occurrence/1");
    }
    
    return (
        <div className="list-occurrences-container">
            
            <div className = "card">
                <img onClick={handleClickCard} src="https://cdn-istoedinheiro-ssl.akamaized.net/wp-content/uploads/sites/17/2020/03/cdbab406b5f84549439b68d43f62a7c31154c55a-768x432.jpg" alt="Logo" />
                <h3 onClick={handleClickCard}>Acidente deixa três feridos próximo a rodoviária de Montes Claros.</h3>
                <p>
                    Aliquam arcu ex, ds imperdiet sit amet lorem. Cras maximus, a vulputate lacus lobortis a. Mauris vitae justo sit amet nisl luctus vulputate a vel ligula. Duis placerat tempus tellus, vitae aliquam velit condimentum ut ...
                </p>
            </div>
            <div className = "card">
                <img src="https://cdn-istoedinheiro-ssl.akamaized.net/wp-content/uploads/sites/17/2020/03/cdbab406b5f84549439b68d43f62a7c31154c55a-768x432.jpg" alt="Logo" />
                <h3>Acidente deixa três feridos próximo a rodoviária de Montes Claros.</h3>
                <p>
                    Aliquam arcu ex, ds imperdiet sit amet lorem. Cras maximus, a vulputate lacus lobortis a. Mauris vitae justo sit amet nisl luctus vulputate a vel ligula. Duis placerat tempus tellus, vitae aliquam velit condimentum ut ...
                </p>
            </div>
            <div className = "card">
                <img src="https://cdn-istoedinheiro-ssl.akamaized.net/wp-content/uploads/sites/17/2020/03/cdbab406b5f84549439b68d43f62a7c31154c55a-768x432.jpg" alt="Logo" />
                <h3>Acidente deixa três feridos próximo a rodoviária de Montes Claros.</h3>
                <p>
                    Aliquam arcu ex, ds imperdiet sit amet lorem. Cras maximus, a vulputate lacus lobortis a. Mauris vitae justo sit amet nisl luctus vulputate a vel ligula. Duis placerat tempus tellus, vitae aliquam velit condimentum ut ...
                </p>
            </div>
            
        </div>
    );
}

export default ListOccurrences;