import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ isInitialLoad, loadingTheme }) => (
    isInitialLoad || loadingTheme ? (
        <div className="flex justify-center items-center h-full">
            <div className="text-primary">
                <CircularProgress />
            </div>
        </div>
    ) : null
);

export default Loading;
