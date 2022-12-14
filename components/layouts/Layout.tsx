import { Box } from "@mui/system"
import Head from "next/head"
import { FC } from "react"
import { Navbar, Sidebar } from "../ui"

interface Props {
    title?: string,
    children: JSX.Element | JSX.Element[]
}

export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
  return (//"sx" es muy parecido al "style" que podemos utilizar en un componente
    <Box sx={{ flexFlow: 1 }}> 
        <Head>
            <title>{ title }</title>
        </Head>

        <Navbar />

        <Sidebar />

        <Box sx={{ padding: '10px 20px' }}>
            { children }
        </Box>

    </Box>
  )
}