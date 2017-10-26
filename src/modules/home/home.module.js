import { BaseComponent } from '../../base/base.component';
import css from './home.module.css';

export class HomeComponent extends BaseComponent {

    constructor() {
        super();
        this._loadLazy();
    }

    static get observedAttributes() { 
        return ['name']; 
    }

    _loadLazy() {
        import('../detail/detail.module.js');
    }

    async render() {
        return `
            <style>${css}</style>
            <h1>${this.properties.name}</h1>
            <ns-detail md="2016-01-03-improve-nested-conditionals"></ns-detail>
        `;
    }
}

window.customElements.define('ns-home', HomeComponent)