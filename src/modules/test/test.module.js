import { BaseComponent } from '../../base/base.component';

export class TestComponent extends BaseComponent {

    constructor() {
        super();
    }

    async render() {
		return `
            <h1>hola</h1>
        `;
    }
}

window.customElements.define('ns-test', TestComponent)