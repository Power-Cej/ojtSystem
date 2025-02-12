import React from 'react';
import ReactDOM from 'react-dom/client';
import ModalContent from './content';

function Dialog() {
    this.close = function () {
        const node = this.nodes.pop();
        node && this.root.unmount();
        node && node.remove();
        this.nodes.length === 0 && document.body.classList.remove('modal-open');
    }
    // html is deprecated
    this.fire = function ({component, html, ...pros}) {
        this.nodes = this.nodes || [];
        const node = document.createElement("div");
        node.setAttribute("tabindex", "-1");
        node.style.position = "relative";
        document.body.appendChild(node);
        this.nodes.push(node);
        this.root = ReactDOM.createRoot(node);
        this.root.render(
            <ModalContent
                isOpen={true}
                onClosed={this.close.bind(this)}
                {...pros}>
                {component || html}
            </ModalContent>
        );
    }
}

export default new Dialog();
