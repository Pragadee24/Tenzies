export default function Die(props)
{
    const Styles = {
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }
    return(
        <div>
        <h3 className="die-face" style={Styles} onClick={props.toggle}>{props.value}</h3>
        </div>
    )
}

