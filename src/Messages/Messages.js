function Message(props){
    return(
        <div>
        <span>
            {props.message}
        </span>
        </div>
    )
}


export default function Messages(props){
    // console.log(props)
    return(
        <div>
            {props.messages.map((message) => <Message message={message}/>)}
        </div>
    )
}