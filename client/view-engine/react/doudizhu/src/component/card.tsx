
export default function Card(props: any) {
    function testLog(){console.log(123)}
    return (
        <div id='card' onClick={testLog}>
            <div style={{top:0,left:0}}>
                {props.face}
            </div>
        </div>
    )
}