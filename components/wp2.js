import { useSelector, useDispatch } from 'react-redux'
import {incrementCount, decrementCount, resetCount, getData, getCommits} from '../redux/actions'
import {Line} from 'react-chartjs-2';
import React from "react";
import { Select, Spin, Button } from 'antd';
import { dynamicColors } from "../utils/functions";
import { languages, weeks } from "../utils/constants";
import { ReloadOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import moment from "moment";

const { Option } = Select;

const wp2 = ({name}) => {
    const commits = useSelector((state) => state.commits)
    const [finalData, setFinalData] = React.useState([65, 59, 80, 81, 56, 55, 40])
    const [selectValue, setSelectValue] = React.useState(10)
    const dispatch = useDispatch()

    const router = useRouter()

    React.useEffect(()=>{
        dispatch(getCommits())
    },[])
    React.useEffect(()=>{
        if(commits.commits!== undefined && commits.commits.length>0){
            let newCommits = commits.commits.sort((a, b) => b[0] - a[0]);
            let data = newCommits.map((e,i)=>{
                if(i<selectValue)
                return {additions:e[1], deletions:e[2], label:moment.unix(e[0]).format("MMM Do YY")}
            })
            data = data.reverse().filter(Boolean)
            setFinalData(data)
        }
    },[commits,selectValue])

    const handleChange = (data) =>{
        setSelectValue(data)
    }

    const data = {
        labels: finalData.map(a => a.label),
        datasets: [
            {
                label: 'Commits additions',
                fill: false,
                lineTension: 0.1,
                backgroundColor: dynamicColors(),
                borderColor: dynamicColors(),
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: dynamicColors(),
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: dynamicColors(),
                pointHoverBorderColor: dynamicColors(),
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: finalData.map(a => a.additions),
            },
            {
                label: 'Commits deletions',
                fill: false,
                lineTension: 0.1,
                backgroundColor: dynamicColors(),
                borderColor: dynamicColors(),
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: dynamicColors(),
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: dynamicColors(),
                pointHoverBorderColor: dynamicColors(),
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: finalData.map(a => a.deletions),
            }

        ]
    };
    return (
        <div style={{textAlign:"center"}}>
        <Spin spinning={commits.loading}>

            {finalData.length > 0 || !commits.error?
                finalData.length &&
                <div style={{height: 400, marginBottom: 50}}>
                    <h2>{name}</h2>
                    <strong>See last </strong>
                    <Select value={selectValue} style={{width: 150}} onChange={handleChange}>
                        {Object.keys(weeks).map((element, i) => {
                            return [
                                <Option key={i} value={weeks[element].value}>{element}</Option>
                            ]
                        })}
                    </Select>
                    <strong> weeks</strong>
                    <Line
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

export default wp2
