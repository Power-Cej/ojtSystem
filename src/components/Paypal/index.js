import React, {useRef, useEffect} from "react";

function Paypal({createOrder, onApprove}) {
    const ref = useRef();
    useEffect(() => {
        window.paypal
            .Buttons({
                style: {
                    color: 'white',
                },
                createOrder: createOrder,
                onApprove: onApprove,
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(ref.current);
    }, []);

    return (
        <div>
            <div ref={ref}></div>
        </div>
    );
}

export default Paypal;
