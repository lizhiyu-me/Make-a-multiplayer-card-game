
export default function Card(props: any) {
    //classic react implementation
    /* let _selectedOffsetY = "-20px";
    let _beginX = props.beginX;
    this["_d_cardSerial"] = props.serial;
    return (
        <div id='card'
            onClick={(e) => {
                console.log(e.target);
                let _top = e.target["style"]["top"]
                e.target["style"]["top"] = _top != _selectedOffsetY ? _selectedOffsetY : "0";
            }}
            style={{left: _beginX+props.idx * 40 + "px"}} data-card-serial={props.serial}
            >
            <div style={{ top: 0, left: 0 }}>
                {props.face}
            </div>
        </div>
    ) */

    //alternative implementation
    return (
        <div id='card'>
            <div style={{ top: 0, left: 0 }}>
            </div>
        </div>
    )
}