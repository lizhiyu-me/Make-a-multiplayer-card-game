export default class GameSceneView {
    constructor() { }
    getViewComponent(name: string,isDOM:boolean = true,canvasScene:any = null) {
        if(isDOM) return document.getElementById(name);
        else {
            if(canvasScene) return canvasScene.getObjectByName(name);
        }
    }
    getChild(childPath, parent) { }
    addClickListener(comp, handler, target) {
        comp && comp.addEventListener("click", handler, target);
    }
    setLabel(labelComp, text) {
        labelComp&&(labelComp.innerText = text);
    }
    isCardSelected(card) {
        return card.position.y == .2 ? true : false;
    }
    showComponent(comp) {
        comp && (comp.style.visibility = "visible");
    }
    hideComponent(comp) {
        comp && (comp.style.visibility = "hidden");
    }
}