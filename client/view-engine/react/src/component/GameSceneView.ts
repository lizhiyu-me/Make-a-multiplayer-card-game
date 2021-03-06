export default class GameSceneView {
    constructor() { }
    getViewComponent(name: string) {
        return document.getElementById(name);
    }
    getNewViewComponent(comp) {
        if (!comp) return;
        return comp.cloneNode(true);
    }
    getChild(childPath, parent) { }
    addClickListener(comp, handler, target) {
        comp && comp.addEventListener("click", handler, target);
    }
    setCard(card, name) {
        if (card) {
            card.children[0].innerText = name;
            card.style.visibility = "visible"
        }
    }
    setLabel(labelComp, text) {
        labelComp&&(labelComp.innerText = text);
    }
    removeAllChildren(parent) {
        // parent.innerHTML = "";
        if (!parent) return
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    addChild(child, parent) {
        (child && parent) && parent.appendChild(child);
    }
    isCardSelected(card) {
        return card.style.top == "-20px" ? true : false;
    }
    toggleCardSelectedStatus(card) {
        let _top = card["style"]["top"]
        card["style"]["top"] = _top != "-20px" ? "-20px" : "0";
    }
    showComponent(comp) {
        comp && (comp.style.visibility = "visible");
    }
    hideComponent(comp) {
        comp && (comp.style.visibility = "hidden");
    }
}