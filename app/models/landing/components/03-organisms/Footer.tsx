import { Layout } from "antd"

const { Footer } = Layout

export const LandingFooter = () => {
  const dateCreated = 2025
  const dateNow = new Date().getFullYear()
  const year = `${dateNow === dateCreated ? dateCreated : `${dateCreated}-${dateNow}`}`

  return (
    <Footer style={{ textAlign: 'center' }}>
      {`@ ${year} Created by Achmad Kurnianto`}
    </Footer>
  )
}