import React from "react";

function OutputImage({field, object}) {
    const value = object[field];
    if (value && typeof value !== 'object') {
        return (
            <img  style={{objectFit: "cover", width: "20px", height: "20px"}} src={value}/>
        )
    }
    return null;
}

export default OutputImage;
