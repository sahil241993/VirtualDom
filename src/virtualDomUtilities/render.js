const renderElem = ({tagName, attrs, children}) => {
    const $element = document.createElement(tagName);

    // set attribute
    for (const [k, v] of Object.entries(attrs)){
        $element.setAttribute(k, v);
    }

    // set children

    for (const child of children){
        const $childElement = render(child);
        $element.append($childElement);
    }
    return $element;
}

const render = (vNode) => {
    if(typeof vNode === 'string'){
        return document.createTextNode(vNode);
    }
    return renderElem(vNode)
}

export default render;