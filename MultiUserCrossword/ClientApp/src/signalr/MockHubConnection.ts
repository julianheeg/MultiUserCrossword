import IHubConnection from "./IHubConnection";

class MockHubConnection implements IHubConnection {
    private callbackByFunctionName: Map<string, (...args: any[]) => void>

    constructor() {
        this.callbackByFunctionName = new Map<string, (...args: any[]) => void>();
    }

    on(methodName: string, newMethod: (...args: any[]) => void) {
        this.callbackByFunctionName.set(methodName, newMethod);
    }

    async send(methodName: string, ...args: any[]) {
    }

    async start() {
    };

    simulateRPC(methodName: string, ...args: any[]) {
        const method = this.callbackByFunctionName.get(methodName);
        if (!method)
            throw new Error('Method ' + methodName + ' not registered');
        method(...args);
    }

    resetMock() {
        this.callbackByFunctionName.clear();
    }
}

export default MockHubConnection;