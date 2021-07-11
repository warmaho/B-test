import { useSelector, useDispatch } from 'react-redux'
import {incrementCount, decrementCount, resetCount, getData} from '../redux/actions'
import {Bar} from 'react-chartjs-2';
import React from "react";
import { Select, Spin, Button } from 'antd';
import {dynamicColors} from "../utils/functions";
import {languages} from "../utils/constants";
import { ReloadOutlined } from '@ant-design/icons';
import {useRouter} from "next/router";

const { Option } = Select;

const wp1 = ({name}) => {
    const top20 = useSelector((state) => state.top20)
    const [finalData, setFinalData] = React.useState([])
    const [selectValue, setSelectValue] = React.useState("All")
    const dispatch = useDispatch()

    const router = useRouter()

    React.useEffect(()=>{
        dispatch(getData(languages.All.query))
    },[])
    React.useEffect(()=>{
        if(top20.top20.items!==undefined && top20.top20.items.length>0){
            const data = top20.top20.items.map(e=>{
                return {star:e.stargazers_count, label:`${e.name} (${e.language})`}
            })
            setFinalData(data)
        }else{
            setFinalData([])
        }
    },[top20])

    const handleChange = (data) =>{
        setSelectValue(data)
        dispatch(getData(languages[data].query))
    }

    const data = {
        labels: finalData.map(a => a.label),
        datasets: [{
            label: '# of Starts',
            data:finalData.map(a => a.star),
            backgroundColor: finalData.map(a => dynamicColors(a.label))
        }]
    }


    return (
        <div style={{textAlign:"center"}}>
        <Spin spinning={top20.loading}>

            {finalData.length > 0 || !top20.error?
                finalData.length &&
                <div style={{height: 400, marginBottom: 50}}>
                    <h2>{name}</h2>
                    <strong>Filter:&nbsp;</strong>
                    <Select value={selectValue} style={{width: 150}} loading={top20.loading} onChange={handleChange}>
                        {Object.keys(languages).map((element, i) => {
                            return [
                                <Option key={i} value={element}>{element}</Option>
                            ]
                        })}
                    </Select>
                    <Bar
                        data={data}
                        width={400}
                        height={200}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                :
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={() => router.reload()}
                >
                     Retry - Something went wrong on server.
                </Button>
            }
        </Spin>
        </div>
  )
}

export default wp1
