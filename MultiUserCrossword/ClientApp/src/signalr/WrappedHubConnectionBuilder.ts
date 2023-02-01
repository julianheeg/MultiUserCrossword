import { HubConnectionBuilder, IHubProtocol, LogLevel } from "@microsoft/signalr";
import IHubConnection from "./IHubConnection";
import WrappedHubConnection from "./WrappedHubConnection";

class WrappedHubConnectionBuilder {
    useMockConnection: boolean;
    hubConnectionBuilder: HubConnectionBuilder;

    constructor(useMockConnection = false) {
        this.useMockConnection = useMockConnection;
        this.hubConnectionBuilder = new HubConnectionBuilder();
    }

    configureLogging(logLevel: LogLevel): WrappedHubConnectionBuilder {
        this.hubConnectionBuilder = this.hubConnectionBuilder.configureLogging(logLevel);
        return this;
    }

    withUrl(url: string): WrappedHubConnectionBuilder {
        this.hubConnectionBuilder = this.hubConnectionBuilder.withUrl(url);
        return this;
    }

    withHubProtocol(protocol: IHubProtocol): WrappedHubConnectionBuilder {
        this.hubConnectionBuilder = this.hubConnectionBuilder.withHubProtocol(protocol);
        return this;
    }

    withAutomaticReconnect(): WrappedHubConnectionBuilder {
        this.hubConnectionBuilder = this.hubConnectionBuilder.withAutomaticReconnect();
        return this;
    }

    build(): IHubConnection {
        const connection = this.hubConnectionBuilder.build();
        return new WrappedHubConnection(connection);
    }
}

export default WrappedHubConnectionBuilder;