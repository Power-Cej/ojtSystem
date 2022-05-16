import classNames from "../../classNames";
import getValue from "../../getValue";

function ProgressNavigation({to, current}) {

    const step = 100 / (to - 1);

    const progressStyle = {width: `${step * (current - 1)}%`};
    return (
        <div className="position-relative m-3">
            <div className="progress" style={{"height": "2px"}}>
                <div className="progress-bar bg-dark" role="progressbar" style={progressStyle}>
                </div>
            </div>
            <span className="badge position-absolute top-0 translate-middle bg-dark">1</span>
            <span
                className={classNames("badge position-absolute top-0 translate-middle start-50", getValue(current > 1, "bg-dark", "bg-white text-dark"))}>2</span>
            <span
                className={classNames("badge position-absolute top-0 translate-middle start-100", getValue(current > 2, "bg-dark", "bg-white text-dark"))}>3</span>
        </div>
    )
}

export default ProgressNavigation;
