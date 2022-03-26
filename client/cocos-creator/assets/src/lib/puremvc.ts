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
      listNotificationInterests(): string[];
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
      notify;
      context;
      constructor(notifyMethod, notifyContext) {
          this.notify = null;
          this.context = null;
          this.setNotifyMethod(notifyMethod);
          this.setNotifyContext(notifyContext);
      }
      getNotifyMethod() {
          return this.notify;
      };
      setNotifyMethod(notifyMethod) {
          this.notify = notifyMethod;
      };
      getNotifyContext() {
          return this.context;
      };
      setNotifyContext(notifyContext) {
          this.context = notifyContext;
      };
      notifyObserver(notification) {
          this.getNotifyMethod().call(this.getNotifyContext(), notification);
      };
      compareNotifyContext(object) {
          return object === this.context;
      };
  }

  export class View {
      static instanceMap = {};
      static MULTITON_MSG = "View instance for this multiton key already constructed!";
      mediatorMap;
      observerMap;
      multitonKey;
      constructor(key) {
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
      registerObserver(notificationName, observer) {
          var observers = this.observerMap[notificationName];
          if (observers)
              observers.push(observer);
          else
              this.observerMap[notificationName] = [observer];
      };
      removeObserver(notificationName, notifyContext) {
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
      notifyObservers(notification) {
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
      registerMediator(mediator) {
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
      retrieveMediator(mediatorName) {
          return this.mediatorMap[mediatorName] || null;
      };
      removeMediator(mediatorName) {
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
      hasMediator(mediatorName) {
          return this.mediatorMap[mediatorName] != null;
      };
      static getInstance(key) {
          if (!View.instanceMap[key])
              View.instanceMap[key] = new View(key);
          return View.instanceMap[key];
      };
      static removeView(key) {
          delete View.instanceMap[key];
      };
  }

  export class Controller {
      static MULTITON_MSG = "Controller instance for this multiton key already constructed!";
      static instanceMap = {};
      view;
      commandMap;
      multitonKey;
      constructor(key) {
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
      executeCommand(notification) {
          var commandClassRef = this.commandMap[notification.getName()];
          if (commandClassRef) {
              var command = new commandClassRef();
              command.initializeNotifier(this.multitonKey);
              command.execute(notification);
          }
      };
      registerCommand(notificationName, commandClassRef) {
          if (!this.commandMap[notificationName])
              this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
          this.commandMap[notificationName] = commandClassRef;
      };
      hasCommand(notificationName) {
          return this.commandMap[notificationName] != null;
      };
      removeCommand(notificationName) {
          if (this.hasCommand(notificationName)) {
              this.view.removeObserver(notificationName, this);
              delete this.commandMap[notificationName];
          }
      };
      static getInstance(key) {
          if (!Controller.instanceMap[key])
              Controller.instanceMap[key] = new Controller(key);
          return Controller.instanceMap[key];
      };
      static removeController(key) {
          delete Controller.instanceMap[key];
      };
  }

  export class Model implements IModel {
      static MULTITON_MSG = "Model instance for this multiton key already constructed!";
      static instanceMap = {};
      proxyMap;
      multitonKey;
      constructor(key) {
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
      registerProxy(proxy) {
          proxy.initializeNotifier(this.multitonKey);
          this.proxyMap[proxy.getProxyName()] = proxy;
          proxy.onRegister();
      };
      removeProxy(proxyName) {
          var proxy = this.proxyMap[proxyName];
          if (proxy) {
              delete this.proxyMap[proxyName];
              proxy.onRemove();
          }
          return proxy;
      };
      retrieveProxy(proxyName) {
          return this.proxyMap[proxyName] || null;
      };
      hasProxy(proxyName) {
          return this.proxyMap[proxyName] != null;
      };
      static getInstance(key) {
          if (!Model.instanceMap[key])
              Model.instanceMap[key] = new Model(key);
          return Model.instanceMap[key];
      };
      static removeModel(key) {
          delete Model.instanceMap[key];
      };
  }

  export class Notification {
      name;
      body;
      type;
      constructor(name, body, type) {
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
      setBody(body) {
          this.body = body;
      };
      getBody() {
          return this.body;
      };
      setType(type) {
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
      static instanceMap = {};
      model
      view
      controller
      multitonKey
      constructor(key) {
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
      registerCommand(notificationName, commandClassRef) {
          this.controller.registerCommand(notificationName, commandClassRef);
      };
      removeCommand(notificationName) {
          this.controller.removeCommand(notificationName);
      };
      hasCommand(notificationName) {
          return this.controller.hasCommand(notificationName);
      };
      registerProxy(proxy) {
          this.model.registerProxy(proxy);
      };
      retrieveProxy(proxyName) {
          return this.model.retrieveProxy(proxyName);
      };
      removeProxy(proxyName) {
          var proxy;
          if (this.model)
              proxy = this.model.removeProxy(proxyName);
          return proxy;
      };
      hasProxy(proxyName) {
          return this.model.hasProxy(proxyName);
      };
      registerMediator(mediator) {
          if (this.view)
              this.view.registerMediator(mediator);
      };
      retrieveMediator(mediatorName) {
          return this.view.retrieveMediator(mediatorName);
      };
      removeMediator(mediatorName) {
          var mediator;
          if (this.view)
              mediator = this.view.removeMediator(mediatorName);
          return mediator;
      };
      hasMediator(mediatorName) {
          return this.view.hasMediator(mediatorName);
      };
      notifyObservers(notification) {
          if (this.view)
              this.view.notifyObservers(notification);
      };
      sendNotification(name, body?, type?) {
          if (typeof body === "undefined") {
              body = null;
          }
          if (typeof type === "undefined") {
              type = null;
          }
          this.notifyObservers(new Notification(name, body, type));
      };
      initializeNotifier(key) {
          this.multitonKey = key;
      };
      static getInstance(key) {
          // if (!Facade.instanceMap[key])
          //     Facade.instanceMap[key] = new Facade(key);
          return Facade.instanceMap[key];
      };

      static hasCore(key) {
          return Facade.instanceMap[key] ? true : false;
      };
      static removeCore(key) {
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
      multitonKey
      constructor() {
          this.multitonKey = null;
      }
      initializeNotifier(key) {
          this.multitonKey = key;
      };
      sendNotification(name, body?, type?) {
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
      subCommands: Function[];
      constructor() {
          super();
          this.subCommands = null;
          this.subCommands = new Array();
          this.initializeMacroCommand();
      }
      initializeMacroCommand() {
      };
      addSubCommand(commandClassRef) {
          this.subCommands.push(commandClassRef);
      };
      execute(notification) {
          var subCommands = this.subCommands.slice(0);
          var len = this.subCommands.length;
          for (var i = 0; i < len; i++) {
              var commandClassRef = subCommands[i];
              var commandInstance = new (commandClassRef as any)();
              commandInstance.initializeNotifier(this.multitonKey);
              commandInstance.execute(notification);
          }
          this.subCommands.splice(0);
      }
  }

  export class SimpleCommand extends Notifier implements ICommand, INotifier {
      constructor() {
          super();
      }
      execute(notification) {
      };
  }

  export class Mediator extends Notifier implements IMediator, INotifier {
      static NAME = 'Mediator';
      mediatorName
      viewComponent
      constructor(mediatorName, viewComponent?) {
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
      setViewComponent(viewComponent) {
          this.viewComponent = viewComponent;
      };
      listNotificationInterests() {
          return [];
      };
      handleNotification(notification) {
      };
      onRegister() {
      };
      onRemove() {
      };
  }

  export class Proxy extends Notifier implements IProxy, INotifier {
      static NAME = "Proxy";
      proxyName
      data
      constructor(proxyName, data?) {
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
      setData(data) {
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