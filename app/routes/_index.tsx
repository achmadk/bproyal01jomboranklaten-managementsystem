import type { Route } from './+types/_index'

import { Button, Layout, QRCode, Typography } from 'antd'

import { SignInButton, SignedIn, SignedOut, useAuth } from '@clerk/react-router'
import { useNavigate } from 'react-router'

import { rootAuthLoader } from '@clerk/react-router/ssr.server'

import appCSS from '../app.css?url'
import { LandingHeader } from '~/models/landing/components/03-organisms/Header'

const { Content, Footer } = Layout

export const loader = async (args: Route.LoaderArgs) =>
  await rootAuthLoader(args, { signInUrl: '/login' })

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: appCSS },
]

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  const navigate = useNavigate()
  const auth = useAuth()

  const handleButton404Clicked = () => {
    navigate('/200')
  }

  const handleButtonLogOutClicked = async () => await auth.signOut()

  return (
    <Layout className="layout">
      <LandingHeader />
      <Content style={{ height: 'calc(100dvh - (70px + 4rem))', marginTop: '4rem', overflow: 'auto' }}>
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
          <SignedOut>
            <SignInButton>
              <Button className="w-full" variant="outlined" color="primary">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button
              className="w-full"
              variant="outlined"
              color="primary"
              onClick={handleButtonLogOutClicked}
            >
              Log Out
            </Button>
          </SignedIn>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {`@ ${new Date().getFullYear()} Created by Achmad Kurnianto`}
      </Footer>
    </Layout>
  )
}
