export default function Message(props){
    return(
        <div>
            <div>
                <span>
                    {(props.message != "Ok")? (props.author + ": "): ""}
                </span>
                <span>
                    {props.message}
                </span>
            </div>
        </div>
    )
}

