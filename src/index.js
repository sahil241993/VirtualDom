import createElement from './virtualDomUtilities/CreateElement'
import render from './virtualDomUtilities/render'
import mount from './virtualDomUtilities/mount'


const myApp = createElement('div',{
    attrs: {
        id: Math.random()
    },
    children: [
        createElement('img', {
            attrs: {
                src: 'https://loremflickr.com/320/240'
            }
        })
    ]
});

const app = render(myApp)

mount (app, document.getElementById('app'));

console.log('######', app)