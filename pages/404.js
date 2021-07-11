import { Result, Button } from 'antd';
import { useRouter } from "next/router";

const NotFound = () => {

    const router = useRouter()
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button onClick={()=>router.push('/')} type="primary">Back Home</Button>}
         />
    )
}

export default NotFound