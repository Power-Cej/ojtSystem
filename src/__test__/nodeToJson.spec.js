import nodeToJson from '../nodeToJson';

describe('nodeToJson', function () {
    const h1 = {
        nodeName: 'H3',
        attributes: [{name: 'style', value: 'background-color: rgb(33, 37, 41);'}, {name: 'class', value: 'p-0'}],
        childNodes: [],
        nodeType: 1
    }
    const text = {
        nodeName: '#text',
        nodeType: 3
    }
    it('should generate json from node element', function () {
        const node = {
            childNodes: [h1, text]
        }
        const expected = {
            type: 'h3',
            props: {style: {backgroundColor: 'rgb(33, 37, 41)'}, className: 'p-0'},
        }
        expect(nodeToJson(node)).toEqual([expected]);
    });
});
