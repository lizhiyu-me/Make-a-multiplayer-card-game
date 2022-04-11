
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
            style={{left: _beginX+props.idx * 40 + "px"}} data-card-serial={props.serial}
            >
            <div style={{ top: 0, left: 0 ,userSelect:"none"}}>
                {props.face}
            </div>
        </div>
    )
}