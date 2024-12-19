import type { Ref } from 'react'
import { useNavigate } from 'react-router'

import { Button } from 'antd'

export interface ErrorMessageProps {
  message?: string
  details?: string

  /**
   * @default null
   */
  stack?: string | null
  ref?: Ref<HTMLElement>
}

export const ErrorMessage = <
  PropType extends ErrorMessageProps = ErrorMessageProps,
>({
  ref,
  message = 'Oops!',
  details = 'An unexpected error occurred.',
  stack = null,
}: PropType) => {
  const navigate = useNavigate()

  const handleButtonHomeClicked = () => {
    navigate('/')
  }

  return (
    <main
      ref={ref}
      className="bg-red-900 text-white w-dvw h-dvh flex flex-col items-center justify-center pt-16 p-4 mx-auto"
    >
      <h1 className="text-9xl font-bold">{message}</h1>
      <p className="my-4">{details}</p>
      <Button danger onClick={handleButtonHomeClicked}>
        Back to Home Page
      </Button>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
