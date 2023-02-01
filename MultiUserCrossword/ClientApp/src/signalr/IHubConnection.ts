interface IHubConnection {
    on: (methodName: string, newMethod: (...args: any[]) => void) => void,
    send: (methodName: string, ...args: any[]) => Promise<void>,
    start: () => Promise<void>
}

export default IHubConnection;