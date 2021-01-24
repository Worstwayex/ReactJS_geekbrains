import Message from "./Messages"
export default function Messages(props){
    // console.log(props)
    return(
        <div>
            {props.messages.map((message) => <Message message={message} author = {props.author}/>)}
        </div>
    )
}