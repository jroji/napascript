'use strict';

export class BaseComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._properties = this.setPropertiesListener(this);
        this.render();
    }

    set properties(newVal) {
        this._properties = this.setPropertiesListener(this, newVal);
    }

    get properties() { return this._properties; }

    async render() {}

    insertContent() {
        this.render().then( content => { 
            this.shadowRoot.innerHTML = content; 
        });
        return true;
    }
    
    setPropertiesListener(context, base = {}) {
        return new Proxy(base, {
            set(target, key, value) {
                Object.assign(target[key] || {}, { value });
                if (target[key].callback) { 
                    target[key].callback.call(context, value).then( _ => {
                        return context.insertContent();
                    });
                };

                return context.insertContent();
            },
            get(target, value) {
                return target[value] ? target[value].value : undefined;
            }
        });
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal === newVal) { return; }
        this._properties[attrName] = newVal;
    }

};