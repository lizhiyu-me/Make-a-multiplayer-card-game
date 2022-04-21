/* eslint-disable */
export namespace puremvc {
    export interface ICommand extends INotifier {
        execute(notification: INotification): void;
    }

    export interface IController {
        executeCommand(notification: INotification): void;
        registerCommand(notificationName: string, commandClassRef: Function): void;
        hasCommand(notificationName: string): boolean;
        removeCommand(notificationName: string): void;
    }

    export interface IFacade extends INotifier {
        registerCommand(notificationName: string, commandClassRef: Function): void;
        removeCommand(notificationName: string): void;
        hasCommand(notificationName: string): boolean;
        registerProxy(proxy: IProxy): void;
        retrieveProxy(proxyName: string): IProxy;
        removeProxy(proxyName: string): IProxy;
        hasProxy(proxyName: string): boolean;
        registerMediator(mediator: IMediator): void;
        retrieveMediator(mediatorName: string): IMediator;
        removeMediator(mediatorName: string): IMediator;
        hasMediator(mediatorName: string): boolean;
        notifyObservers(notification: INotification): void;
    }

    export interface IMediator extends INotifier {
        getMediatorName(): string;
        getViewComponent(): any;
        setViewComponent(viewComponent: any): void;
        listNotificationInterests(E?:any): symbol[] | string[];
        handleNotification(notification: INotification): void;
        onRegister(): void;
        onRemove(): void;
    }

    export interface IModel {
        registerProxy(proxy: IProxy): void;
        removeProxy(proxyName: string): IProxy;
        retrieveProxy(proxyName: string): IProxy;
        hasProxy(proxyName: string): boolean;
    }

    export interface INotification {
        getName(): string;
        setBody(body: any): void;
        getBody(): any;
        setType(type: string): void;
        getType(): string;
        toString(): string;
    }

    export interface INotifier {
        sendNotification(name: string, body?: any, type?: string): void;
        initializeNotifier(key: string): void;
    }

    export interface IObserver {
        setNotifyMethod(notifyMethod: Function): void;
        setNotifyContext(notifyContext: any): void;
        notifyObserver(notification: INotification): void;
        compareNotifyContext(object: any): boolean;
    }

    export interface IProxy extends INotifier {
        getProxyName(): string;
        setData(data: any): void;
        getData(): any;
        onRegister(): void;
        onRemove(): void;
    }

    export interface IView {
        registerObserver(notificationName: string, observer: IObserver): void;
        removeObserver(notificationName: string, notifyContext: any): void;
        notifyObservers(notification: INotification): void;
        registerMediator(mediator: IMediator): void;
        retrieveMediator(mediatorName: string): IMediator;
        removeMediator(mediatorName: string): IMediator;
        hasMediator(mediatorName: string): boolean;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    export class Observer {
        notify:any;
        context:any;
        constructor(notifyMethod:any, notifyContext:any) {
            this.notify = null;
            this.context = null;
            this.setNotifyMethod(notifyMethod);
            this.setNotifyContext(notifyContext);
        }
        getNotifyMethod() {
            return this.notify;
        };
        setNotifyMethod(notifyMethod:any) {
            this.notify = notifyMethod;
        };
        getNotifyContext() {
            return this.context;
        };
        setNotifyContext(notifyContext:any) {
            this.context = notifyContext;
        };
        notifyObserver(notification:any) {
            this.getNotifyMethod().call(this.getNotifyContext(), notification);
        };
        compareNotifyContext(object:any) {
            return object === this.context;
        };
    }

    export class View {
        static instanceMap:any = {};
        static MULTITON_MSG = "View instance for this multiton key already constructed!";
        mediatorMap:any;
        observerMap:any;
        multitonKey:any;
        constructor(key:any) {
            this.mediatorMap = null;
            this.observerMap = null;
            this.multitonKey = null;
            if (View.instanceMap[key])
                throw Error(View.MULTITON_MSG);
            View.instanceMap[key] = this;
            this.multitonKey = key;
            this.mediatorMap = {};
            this.observerMap = {};
            this.initializeView();
        }
        initializeView() {
        };
        registerObserver(notificationName:any, observer:any) {
            var observers = this.observerMap[notificationName];
            if (observers)
                observers.push(observer);
            else
                this.observerMap[notificationName] = [observer];
        };
        removeObserver(notificationName:any, notifyContext:any) {
            var observers = this.observerMap[notificationName];
            var i = observers.length;
            while (i--) {
                var observer = observers[i];
                if (observer.compareNotifyContext(notifyContext)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            if (observers.length == 0)
                delete this.observerMap[notificationName];
        };
        notifyObservers(notification:any) {
            var notificationName = notification.getName();
            var observersRef = this.observerMap[notificationName];
            if (observersRef) {
                var observers = observersRef.slice(0);
                var len = observers.length;
                for (var i = 0; i < len; i++) {
                    var observer = observers[i];
                    observer.notifyObserver(notification);
                }
            }
        };
        registerMediator(mediator:any) {
            var name = mediator.getMediatorName();
            if (this.mediatorMap[name])
                return;
            mediator.initializeNotifier(this.multitonKey);
            this.mediatorMap[name] = mediator;
            var interests = mediator.listNotificationInterests();
            var len = interests.length;
            if (len > 0) {
                var observer = new Observer(mediator.handleNotification, mediator);
                for (var i = 0; i < len; i++)
                    this.registerObserver(interests[i], observer);
            }
            mediator.onRegister();
        };
        retrieveMediator(mediatorName:any) {
            return this.mediatorMap[mediatorName] || null;
        };
        removeMediator(mediatorName:any) {
            var mediator = this.mediatorMap[mediatorName];
            if (!mediator)
                return null;
            var interests = mediator.listNotificationInterests();
            var i = interests.length;
            while (i--)
                this.removeObserver(interests[i], mediator);
            delete this.mediatorMap[mediatorName];
            mediator.onRemove();
            return mediator;
        };
        hasMediator(mediatorName:any) {
            return this.mediatorMap[mediatorName] != null;
        };
        static getInstance(key:any) {
            if (!View.instanceMap[key])
                View.instanceMap[key] = new View(key);
            return View.instanceMap[key];
        };
        static removeView(key:any) {
            delete View.instanceMap[key];
        };
    }

    export class Controller {
        static MULTITON_MSG = "Controller instance for this multiton key already constructed!";
        static instanceMap:any = {};
        view:any;
        commandMap:any;
        multitonKey:any;
        constructor(key:any) {
            this.view = null;
            this.commandMap = null;
            this.multitonKey = null;
            if (Controller.instanceMap[key])
                throw Error(Controller.MULTITON_MSG);
            Controller.instanceMap[key] = this;
            this.multitonKey = key;
            this.commandMap = {};
            this.initializeController();
        }
        initializeController() {
            this.view = View.getInstance(this.multitonKey);
        };
        executeCommand(notification:any) {
            var commandClassRef = this.commandMap[notification.getName()];
            if (commandClassRef) {
                var command = new commandClassRef();
                command.initializeNotifier(this.multitonKey);
                command.execute(notification);
            }
        };
        registerCommand(notificationName:any, commandClassRef:any) {
            if (!this.commandMap[notificationName])
                this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
            this.commandMap[notificationName] = commandClassRef;
        };
        hasCommand(notificationName:any) {
            return this.commandMap[notificationName] != null;
        };
        removeCommand(notificationName:any) {
            if (this.hasCommand(notificationName)) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        };
        static getInstance(key:any) {
            if (!Controller.instanceMap[key])
                Controller.instanceMap[key] = new Controller(key);
            return Controller.instanceMap[key];
        };
        static removeController(key:any) {
            delete Controller.instanceMap[key];
        };
    }

    export class Model implements IModel {
        static MULTITON_MSG = "Model instance for this multiton key already constructed!";
        static instanceMap:any = {};
        proxyMap:any;
        multitonKey:any;
        constructor(key:any) {
            this.proxyMap = null;
            this.multitonKey = key;
            if (Model.instanceMap[key])
                throw Error(Model.MULTITON_MSG);
            Model.instanceMap[key] = this;
            this.multitonKey = key;
            this.proxyMap = {};
            this.initializeModel();
        }
        initializeModel() {
        };
        registerProxy(proxy:any) {
            proxy.initializeNotifier(this.multitonKey);
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        };
        removeProxy(proxyName:any) {
            var proxy = this.proxyMap[proxyName];
            if (proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        };
        retrieveProxy(proxyName:any) {
            return this.proxyMap[proxyName] || null;
        };
        hasProxy(proxyName:any) {
            return this.proxyMap[proxyName] != null;
        };
        static getInstance(key:any) {
            if (!Model.instanceMap[key])
                Model.instanceMap[key] = new Model(key);
            return Model.instanceMap[key];
        };
        static removeModel(key:any) {
            delete Model.instanceMap[key];
        };
    }

    export class Notification {
        name;
        body;
        type;
        constructor(name:any, body:any, type:any) {
            if (typeof body === "undefined") {
                body = null;
            }
            if (typeof type === "undefined") {
                type = null;
            }
            this.name = name;
            this.body = body;
            this.type = type;
        }
        getName() {
            return this.name;
        };
        setBody(body:any) {
            this.body = body;
        };
        getBody() {
            return this.body;
        };
        setType(type:any) {
            this.type = type;
        };
        getType() {
            return this.type;
        };
        toString() {
            var msg = "Notification Name: " + this.getName();
            msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
            msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
            return msg;
        };
    }

    export class Facade {
        static MULTITON_MSG = "Facade instance for this multiton key already constructed!";
        static instanceMap:any = {};
        model:any
        view:any
        controller:any
        multitonKey:any
        constructor(key:any) {
            this.model = null;
            this.view = null;
            this.controller = null;
            this.multitonKey = null;
            if (Facade.instanceMap[key])
                throw Error(Facade.MULTITON_MSG);
            this.initializeNotifier(key);
            Facade.instanceMap[key] = this;
            this.initializeFacade();
        }
        initializeFacade() {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        };
        initializeModel() {
            if (!this.model)
                this.model = Model.getInstance(this.multitonKey);
        };
        initializeController() {
            if (!this.controller)
                this.controller = Controller.getInstance(this.multitonKey);
        };
        initializeView() {
            if (!this.view)
                this.view = View.getInstance(this.multitonKey);
        };
        registerCommand(notificationName:any, commandClassRef:any) {
            this.controller.registerCommand(notificationName, commandClassRef);
        };
        removeCommand(notificationName:any) {
            this.controller.removeCommand(notificationName);
        };
        hasCommand(notificationName:any) {
            return this.controller.hasCommand(notificationName);
        };
        registerProxy(proxy:any) {
            this.model.registerProxy(proxy);
        };
        retrieveProxy(proxyName:any) {
            return this.model.retrieveProxy(proxyName);
        };
        removeProxy(proxyName:any) {
            var proxy;
            if (this.model)
                proxy = this.model.removeProxy(proxyName);
            return proxy;
        };
        hasProxy(proxyName:any) {
            return this.model.hasProxy(proxyName);
        };
        registerMediator(mediator:any) {
            if (this.view)
                this.view.registerMediator(mediator);
        };
        retrieveMediator(mediatorName:any) {
            return this.view.retrieveMediator(mediatorName);
        };
        removeMediator(mediatorName:any) {
            var mediator;
            if (this.view)
                mediator = this.view.removeMediator(mediatorName);
            return mediator;
        };
        hasMediator(mediatorName:any) {
            return this.view.hasMediator(mediatorName);
        };
        notifyObservers(notification:any) {
            if (this.view)
                this.view.notifyObservers(notification);
        };
        sendNotification(name:any, body?:any, type?:any) {
            if (typeof body === "undefined") {
                body = null;
            }
            if (typeof type === "undefined") {
                type = null;
            }
            this.notifyObservers(new Notification(name, body, type));
        };
        initializeNotifier(key:any) {
            this.multitonKey = key;
        };
        static getInstance(key:any): Facade {
            // if (!Facade.instanceMap[key])
            //     Facade.instanceMap[key] = new Facade(key);
            return Facade.instanceMap[key];
        };

        static hasCore(key:any) {
            return Facade.instanceMap[key] ? true : false;
        };
        static removeCore(key:any) {
            if (!Facade.instanceMap[key])
                return;
            Model.removeModel(key);
            View.removeView(key);
            Controller.removeController(key);
            delete Facade.instanceMap[key];
        };
    }

    export class Notifier {
        static MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
        multitonKey:any
        constructor() {
            this.multitonKey = null;
        }
        initializeNotifier(key:any) {
            this.multitonKey = key;
        };
        sendNotification(name:any, body?:any, type?:any) {
            if (typeof body === "undefined") {
                body = null;
            }
            if (typeof type === "undefined") {
                type = null;
            }
            if (this.facade())
                this.facade().sendNotification(name, body, type);
        };
        facade() {
            if (this.multitonKey === null)
                throw Error(Notifier.MULTITON_MSG);
            return Facade.getInstance(this.multitonKey);
        };
    }

    export class MacroCommand extends Notifier implements ICommand, INotifier {
        subCommands: Function[]|null;
        constructor() {
            super();
            this.subCommands = null;
            this.subCommands = new Array();
            this.initializeMacroCommand();
        }
        initializeMacroCommand() {
        };
        addSubCommand(commandClassRef:any) {
            this.subCommands!.push(commandClassRef);
        };
        execute(notification:any) {
            var subCommands = this.subCommands!.slice(0);
            var len = this.subCommands!.length;
            for (var i = 0; i < len; i++) {
                var commandClassRef = subCommands[i];
                var commandInstance = new (commandClassRef as any)();
                commandInstance.initializeNotifier(this.multitonKey);
                commandInstance.execute(notification);
            }
            this.subCommands!.splice(0);
        }
    }

    export class SimpleCommand extends Notifier implements ICommand, INotifier {
        constructor() {
            super();
        }
        execute(notification:any) {
        };
    }

    export class Mediator extends Notifier implements IMediator, INotifier {
        static NAME = 'Mediator';
        mediatorName:any
        viewComponent:any
        constructor(mediatorName:any, viewComponent?:any) {
            super()
            if (typeof mediatorName === "undefined") {
                mediatorName = null;
            }
            if (typeof viewComponent === "undefined") {
                viewComponent = null;
            }
            this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
            this.viewComponent = viewComponent;
        }
        getMediatorName() {
            return this.mediatorName;
        };
        getViewComponent() {
            return this.viewComponent;
        };
        setViewComponent(viewComponent:any) {
            this.viewComponent = viewComponent;
        };
        listNotificationInterests(E:any) {
            return [];
        };
        handleNotification(notification:any) {
        };
        onRegister() {
        };
        onRemove() {
        };
    }

    export class Proxy extends Notifier implements IProxy, INotifier {
        static NAME = "Proxy";
        proxyName:any
        data:any
        constructor(proxyName:any, data?:any) {
            super();
            if (typeof proxyName === "undefined") {
                proxyName = null;
            }
            if (typeof data === "undefined") {
                data = null;
            }
            this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
            if (data != null)
                this.setData(data);
        }
        getProxyName() {
            return this.proxyName;
        };
        setData(data:any) {
            this.data = data;
        };
        getData() {
            return this.data;
        };
        onRegister() {
        };
        onRemove() {
        };
    }
}