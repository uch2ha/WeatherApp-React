import React from 'react';

const ErrorMessages = ({
    otherError,
    locationKeyError,
    duplicateCitiesError,
}) => {
    return (
        <>
            {otherError && <div className='error-message'>OTHER ERROR</div>}
            {locationKeyError && (
                <div className='error-message'>LOCATION KEY ERROR</div>
            )}
            {duplicateCitiesError && (
                <div className='error-message'>
                    This city is already existed
                </div>
            )}
        </>
    );
};

export default ErrorMessages;
