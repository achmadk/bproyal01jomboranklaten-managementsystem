import type { Route } from './+types/_index'

import { Button, Layout, QRCode, Typography } from 'antd'

import { SignInButton, SignedIn, SignedOut } from '@clerk/react-router'
import { useNavigate } from 'react-router'

import { rootAuthLoader } from '@clerk/react-router/ssr.server'

import { LandingHeader } from '~/models/landing/components/03-organisms/Header'
import { LandingFooter } from '~/models/landing/components/03-organisms/Footer'

import appCSS from '../app.css?url'
import { DashboardContent } from '~/models/dashboard/components/03-organisms/Content'

const { Content } = Layout

export const loader = async (args: Route.LoaderArgs) =>
  await rootAuthLoader(args, { signInUrl: '/login' })

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: appCSS },
]

export function meta() {
  return [
    { title: 'BP Royal Residence Jomboran Klaten Management System' },
    { name: 'description', content: 'Welcome to BP Royal Residence Jomboran Klaten Management System!' },
  ]
}

export default function Home() {
  const navigate = useNavigate()

  const handleButton404Clicked = () => {
    navigate('/200')
  }

  return (
    <Layout className="layout">
      <LandingHeader />
      <Content style={{ height: 'calc(100dvh - (70px + 4rem))', marginTop: '4rem', overflow: 'auto' }}>
        <SignedIn>
          <DashboardContent />
        </SignedIn>
        <SignedOut>

          <div className="flex flex-col items-center justify-center gap-y-4">
            <div style={{ backgroundColor: 'white' }}>
              <QRCode value={'hello world!!!'} errorLevel="H" />
            </div>
            <Typography.Text className="dark:text-white!">
              Sample QR code
            </Typography.Text>
            <Button variant="solid" type="primary" onClick={handleButton404Clicked}>
              Hello
            </Button>
            <SignInButton>
              <Button className="w-full" variant="outlined" color="primary">
                Sign in
              </Button>
            </SignInButton>
          </div>
        </SignedOut>
      </Content>
      <LandingFooter />
    </Layout>
  )
}
