import { BaseComponent } from '../../base/base.component';
import css from './detail.module.css';

export class DetailComponent extends BaseComponent {

    constructor() {
        super();

        // Just declared for good practices, not necessary
		this.properties = {
			md: {
                value: null,
                callback: this._importMd
            }
		};
    }

    static get observedAttributes() { 
        return ['md']; 
    }

    async _importMd(md) {
        let data = await import(`../../posts/${md}.md`);
        this.file = data;
    }
    
    async render() {        
        return `
            <style>${css}</style>
            <article>${this.file}</article>
        `;
    }
}

window.customElements.define('ns-detail', DetailComponent);
