import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/react-router'
import { Button, Layout } from 'antd'

import logoXL from '~/assets/images/logo_xl.png?url'

const { Header } = Layout

export const LandingHeader = () => {
  return (
    <Header
      className="sm:pl-0"
      style={{
        position: 'fixed',
        width: '100dvw',
        top: 0,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="flex items-center justify-center pt-8">
        <img
          src={logoXL}
          alt="BP Royal Residence Logo"
          className="w-48 h-48 sm:w-24 sm:h-24 md:w-48 md:h-48"
        />
      </div>
      <div className="flex items-center justify-center">
        <SignedOut>
          <SignInButton>
            <Button variant="outlined" color="primary">
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </Header>
  )
}
