import React from 'react';

const invalid = ['#text', undefined];

function createElement({type, props = {}, children}, key) {
    console.log(type);
    if (invalid.includes(type)) return null;
    props.key = props.key || key;
    return React.createElement(type, props, children && children.map((child, index) => child instanceof Object ? createElement(child, index) : child));
}

export default createElement;
