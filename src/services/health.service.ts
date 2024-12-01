import {addLog} from "@d2sutils/logging";

export const healthService = () => {
    addLog('healthService was called', 'info');
    return {status: 'ok'};
}
