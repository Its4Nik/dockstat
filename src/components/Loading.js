import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ isInitialLoad, loadingTheme }) => (
    isInitialLoad || loadingTheme ? (
        <div className="flex justify-center items-center">
            <CircularProgress />
        </div>
    ) : null
);

export default Loading;
