import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";;
import Page1 from '../components/wp1'

const WP1 = () => {
    const router = useRouter()

    return (
        <Result
            icon={<SmileOutlined />}
            title="Bayonet Front-end Test Project - Web Page 1"
            extra={[
                <Button key="to-home" onClick={()=>router.push('/')} type="primary">Home</Button>,
                <Button key="to-wp2" onClick={()=>router.push('/web-page-2')} type="primary">Web page 2</Button>
            ]}
        >
            <Page1 name="Top 20 repositories on Github"/>
        </Result>
    )
}

export default WP1