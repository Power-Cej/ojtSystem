import React from "react";
import classNames from "../../classNames";
import nodeToJson from "../../nodeToJson";

const defaultProps = {};

function ContentEditor({className, onSubmit, ...props}) {
    const classes = classNames('form-control border-end-0', className);
    const ref = React.useRef();
    React.useEffect(() => {
        document.execCommand("defaultParagraphSeparator", false, "p");
        document.execCommand('formatBlock', false, 'p';
    }, [])

    function submitClick() {
        const editor = ref.current;
        const nodes = Array.from(editor.childNodes);
        nodes.length && onSubmit(nodes.map((node) => nodeToJson(node)));
    }

    function onKeyUp(e) {
        const editor = ref.current;
        // change the first child into p
        const firstChild = editor.firstChild;
        if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
            const selection = window.getSelection();
            const text = firstChild.textContent;
            const p = document.createElement('p';
            p.className = "m-0 d-inline";
            p.textContent = text;
            editor.appendChild(p);
            // fix for s5 keyboard double the 1st charter
            setTimeout(() => {
                firstChild.remove();
                p.className = "m-0";
            }, 0);
            // set cursor to end
            const range = selection.getRangeAt(0);
            range.setStartAfter(p);
            range.setEndAfter(p);
        }
    }


    function onKeyDown(e) {
        // if enter submit
        if (e.keyCode === 13) {
            e.preventDefault();
            submitClick();
        }
        // if shift enter insert break inside in paragraph
        if (e.shiftKey && e.keyCode === 13) {
            e.preventDefault();
            const selection = window.getSelection();
            // get range
            const range = selection.getRangeAt(0);
            const br = document.createElement("br");
            const temp = document.createElement("br"); // temporary replace when user type
            range.deleteContents();//required or not?
            range.insertNode(br);
            range.collapse(false);// collapse range to end
            range.insertNode(temp);
            range.selectNodeContents(temp);// select
            // add range to selection
            range.setStartAfter(br);
            range.setEndAfter(temp);// section to end
            selection.removeAllRanges();
            selection.addRange(range);
            return false;
        }
    }

    return (
        <div className="input-group">
            <div
                ref={ref}
                onKeyUp={onKeyUp.bind(this)}
                onKeyDown={onKeyDown}
                contentEditable
                className={classes}
                {...props}>
            </div>
            <button
                type="button"
                className="btn btn-link shadow-none border border-start-0 text-primary"
                onClick={submitClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                     width="24px">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path
                        d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/>
                </svg>
            </button>
        </div>

    )
}

ContentEditor.defaultProps = defaultProps;

export default ContentEditor;
