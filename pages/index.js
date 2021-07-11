import { Result, Button, Typography } from 'antd';
import { SmileOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { useRouter } from "next/router";

const { Paragraph, Text } = Typography;
const Index = () => {

  const router = useRouter()

  return (
        <Result
            icon={<SmileOutlined />}
            title="Bayonet Front-end Test Project"
            extra={[
                <Button key="to-wp1" onClick={()=>router.push('/web-page-1')} type="primary">Web page 1</Button>,
                <Button key="to-wp2" onClick={()=>router.push('/web-page-2')} type="primary">Web page 2</Button>
            ]}
        >
          <div className="desc">
            <Paragraph>
              <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
              >
                Our webapp should have the following 2 pages:
              </Text>
            </Paragraph>
            <Paragraph>
              <CheckCircleTwoTone /> Web page 1 <br/>
                For the first webpage, we want to visualize the top 20 repositories on Github. Check the searchrepositories endpoint of the Github API as a starting point on how to get repository data.
                We want to fetch the top 20 repositories on Github (by number of stars) and display them using
                a Column / Bar chart.
                Additionally, we want to filter the chart info for different languages. For simplicity, let’s add the
                following 5 filters: All (no filter), Javascript, Go, Ruby, Python.
                The filters can be simple buttons for each option or a dropdown menu showing available
                options.
            </Paragraph>
            <Paragraph>
              <CheckCircleTwoTone /> Web page 2 <br/>
              For the second webpage, we want to visualize the commit activity data on the React Github
              repository. The Github API has a statistics endpoint for fetching statistics on a particular
              repository.
              We want to fetch the last 10 weeks of commit activity on the React Github repo and display the
              number of commits per week using a Line chart. Take a look at the commit activity data
              endpoint of the Github API on how to get this data for a specific repository
            </Paragraph>
          </div>
        </Result>
    )
}

export default Index