import render from './render';

const zip = (prev, curr) => {
    const zipped = []
    for (let i=0; i <= Math.min(prev.length, curr.length); i++){
        zipped.push([prev[i], curr[i]])
    }
    return zipped;
}

const diffAttr = (vOldAttr, vNewAttr) => {
    const patches = []
    for(const [key, value] of Object.entries(vNewAttr)){
        patches.push(node => {
            node.setAttribute(key, value);
            return node
        })
    }
    for(const key in vOldAttr){
        if(!(key in vNewAttr)){
            patches.push(node => {
                node.removeAttribute(key)
            })
        }
    }
    return node => {
        for(const patch of patches){
            patch(node)
        }
    }
}

const diffChildren = (vOldChildren, vNewChildren) => {
    const childPatches = []
    for (const [oldVNode, newVNode] of zip(vOldChildren, vNewChildren)){
        childPatches.push(diff(oldVNode,newVNode));
    }

    const additionalPatches = [];
    for (const additionalVChild of vNewChildren.slice(vOldChildren.length)){
        additionalPatches.push(node => {
            node.appendChild(render(additionalVChild))
        })
    }
    return Parent => {
        for(const [patch, child] of zip(childPatches, Parent.childNodes)){
            patch(child);
        }
        for(const patch of additionalPatches){
            patch(Parent);
        }
        return Parent;
    }
}

export default (vOldNode, vNewNode) => {
    if (vNewNode === undefined){
        return node => {
            node.remove()
            return undefined
        }
    }
    if(typeof vOldNode === 'string' || typeof vNewNode === 'string'){
        if (vOldNode !== vNewNode){
            return node => {
                const newNode = render(vNewNode)
                node.replaceWith(newNode);
                return newNode;
            }
        } else {
            return node => undefined;
        }
    }

    if (vOldNode.tagName !== vNewNode.tagName){
        return node => {
            const newNode = render(vNewNode)
            node.replaceWith(newNode);
            return newNode;
        }
    }

    const patchAttr = diffAttr(vOldNode.attrs, vNewNode.attrs);
    const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

    return node => {
        patchAttr(node)
        patchChildren(node)
        return node
    }
}