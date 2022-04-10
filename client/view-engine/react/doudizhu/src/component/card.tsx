
export default function Card(props: any) {
    let _selectedOffsetY = "-20px";
    return (
        <div id='card'
            onClick={(e) => {
                console.log(e.target);
                let _top = e.target["style"]["top"]
                e.target["style"]["top"] = _top != _selectedOffsetY ? _selectedOffsetY : "0";
            }}
            style={{left: props.idx * 40 + "px"}}>
            <div style={{ top: 0, left: 0 }}>
                {props.face}
            </div>
        </div>
    )
}