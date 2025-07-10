import { useUser } from '@clerk/react-router'
import { Layout, Typography } from 'antd'

const { Title } = Typography

export const DashboardContent = () => {
  const { user } = useUser()

  return (
    <Layout>
      <Layout.Content>
        <Title>{`Hello, ${user?.fullName ?? '-'}!`}</Title>
      </Layout.Content>
    </Layout>
  )
}
