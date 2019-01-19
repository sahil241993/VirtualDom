import createElement from './virtualDomUtilities/CreateElement'
import render from './virtualDomUtilities/render'
import mount from './virtualDomUtilities/mount'
import diff from './virtualDomUtilities/diff'
import { setInterval } from 'core-js';


const myApp = (count) => createElement('div',{
    attrs: {
        id: Math.random(),
        dataCount: count
    },
    children: [
        String(count),
        createElement('img', {
            attrs: {
                src: 'https://loremflickr.com/320/240'
            }
        })
    ]
});

let count =10
const vApp = myApp(count);

const app = render(vApp);

let rootEl = mount (app, document.getElementById('app'));

setInterval(() => {
    count++;
    const vNewNode = myApp(count);
    const patch = diff(vApp, vNewNode);
    rootEl = patch(rootEl);
}, 1000);

console.log('######', app)