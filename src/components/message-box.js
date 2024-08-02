
import { Alert } from "antd";

const MessageBox = (props) => {
    const { message } = props

    return (
        <Alert type='warning'
               showIcon
               message={ message } />
    )
}

export default MessageBox