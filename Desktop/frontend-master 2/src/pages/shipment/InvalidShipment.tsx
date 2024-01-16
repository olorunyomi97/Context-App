import React from 'react';
import OfapInvalidEmail from 'components/ofap/OfapInvalidEmail';

const InvalidShipment = () => {
    const invalidJobNumber = sessionStorage.getItem("invalidJobNumber");

    return (
        <>
            <OfapInvalidEmail
                buttonLinkTo='dashboard'
                invalidJobNumber={invalidJobNumber}
            />
        </>
    )
}

export default InvalidShipment;