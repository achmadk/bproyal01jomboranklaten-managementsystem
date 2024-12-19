import { ErrorMessage } from '~/components'

const Page404 = () => {
  return (
    <ErrorMessage
      message="404"
      details="The requested page could not be found."
    />
  )
}

export default Page404
