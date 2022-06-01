import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import Context from "./AppContext";

function WithRouter({children}) {
    const navigate = useNavigate();
    const params = useParams();
    return children(params, navigate);
}

function withContext(WrappedComponent) {
    return React.forwardRef((props, ref) => (
        <WithRouter>
            {(params, navigate) => (
                <Context.Consumer>
                    {(value) => <WrappedComponent
                        navigate={navigate}
                        params={params}
                        ref={ref}
                        {...value} {...props} />
                    }
                </Context.Consumer>
            )}
        </WithRouter>
    ));
}

export default withContext;
