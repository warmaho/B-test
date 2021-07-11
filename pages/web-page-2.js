import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import Page2 from '../components/wp2'

const WP2 = () => {
    const router = useRouter()

    return (
        <Result
            icon={<SmileOutlined />}
            title="Bayonet Front-end Test Project - Web Page 2"
            extra={[
                <Button key="to-wp2" onClick={()=>router.push('/web-page-1')} type="primary">Web page 1</Button>,
                <Button key="to-home" onClick={()=>router.push('/')} type="primary">Home</Button>
            ]}
        >
            <Page2 name="Commit activity data on the React Github repository"/>
        </Result>
    )
}

export default WP2