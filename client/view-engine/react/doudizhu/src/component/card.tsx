
export default function Card(props: any) {
    let _selectedOffsetY = "-20px";
    let _beginX = props.beginX;
    return (
        <div id='card'
            onClick={(e) => {
                console.log(e.target);
                let _top = e.target["style"]["top"]
                e.target["style"]["top"] = _top != _selectedOffsetY ? _selectedOffsetY : "0";
            }}
            style={{ left: _beginX + props.idx * 40 + "px" }} data-card-serial={props.serial}
        >
            <span style={{ userSelect: "none" ,fontSize:"32px"}}>
                {props.face}
            </span>
        </div>
    )
}