import React, {useState} from 'react';

import ReactModal from 'react-modal';

function Main() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ReactModal isOpen={isOpen}>
            <p>Lançamento de Ocorrencia</p>
            <button onClick={() =>setIsOpen(false)}>Fechar</button>
        </ReactModal>
    );
}

export default Main;