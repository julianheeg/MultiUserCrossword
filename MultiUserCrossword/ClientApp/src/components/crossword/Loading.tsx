import { FC } from 'react';

interface LoadingProps {
    connectionCallbacksReady: boolean
}

const Loading: FC<LoadingProps> = (props) => {
    if (props.connectionCallbacksReady)
        return (
            <div data-testid={'connectionCallbacksReady'}>
                <p><em>Loading...</em></p >
            </div>
        );
    return (
        <div>
            <p><em>Loading...</em></p >
        </div>
    );
}

export default Loading;