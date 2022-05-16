import React from 'react';
import ReactDOM from 'react-dom';
import ModalContent from './content';

function Dialog() {
    this.close = function () {
        const node = this.nodes.pop();
        node && ReactDOM.unmountComponentAtNode(node);
        node && node.remove();
        this.nodes.length === 0 && document.body.classList.remove('modal-open');
    }
    this.fire = function ({html, ...others}) {
        this.nodes = this.nodes || [];
        const node = document.createElement("div");
        node.setAttribute("tabindex", "-1");
        node.style.position = "relative";
        document.body.appendChild(node);
        this.nodes.push(node);
        return ReactDOM.render(
            <ModalContent
                isOpen={true}
                onClosed={this.close.bind(this)}
                {...others}>
                {html}
            </ModalContent>, node
        );
    }
}

export default new Dialog();
