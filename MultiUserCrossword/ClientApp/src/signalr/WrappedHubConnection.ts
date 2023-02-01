import IHubConnection from './IHubConnection';
import MockHubConnection from './MockHubConnection';

class WrappedHubConnection implements IHubConnection {
    connection: IHubConnection;

    constructor(connection: IHubConnection) {
        this.connection = connection;
    }

    on(methodName: string, newMethod: (args: any[]) => void) {
        this.connection.on(methodName, newMethod);
    }

    async send(methodName: string, ...args: any[]) {
        await this.connection.send(methodName, ...args);
    }

    async start() {
        await this.connection.start();
    }

    simulateRPC(methodName: string, ...args: any[]) {
        if (this.connection instanceof MockHubConnection) {
            this.connection.simulateRPC(methodName, ...args);
        }
    }
}

export default WrappedHubConnection;