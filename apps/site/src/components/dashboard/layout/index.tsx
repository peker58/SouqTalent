import dynamic from 'next/dynamic'
import React, { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
const MainHeader = dynamic(() => import('../header')) as any

const Layout = (props: { children: any }) => {
	const { isLogIn } = useContext(ThemeContext) as any
	if (isLogIn) {
		return (
			<>
				<MainHeader IsLogIn={true}>{props.children}</MainHeader>
			</>
		)
	} else {
		return (
			<>
				<MainHeader IsLogIn={false}>{props.children}</MainHeader>
			</>
		)
	}
}

export default Layout
