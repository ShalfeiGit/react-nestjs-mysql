﻿import React, { useEffect, useState }from 'react'
import { useSelector } from 'react-redux'
import { Input, Typography, Tabs, TabsProps } from 'antd'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import queryString from 'query-string'

import '@app/pages/userInfo/userInfo.scss'
import { RootState } from '@app/store/store'
import UserContent from './components/userContent'
import ArticlesContent from './components/articleContent'
import { INotificationAction } from '@app/shared/layout/types'

const UserInfo: React.FC = () => {
	const navigate = useNavigate()
	const {username} = useParams()
	const openNotification = useOutletContext()
	const [tabQuery, setTabQuery]  = useState('')
	const userInfo = useSelector((state: RootState) => state.userInfo.data)
	const tabs: TabsProps['items'] = [
		{
			key: 'user-content',
			label: 'User Info',
			children: <UserContent /> ,
		},
		{
			key: 'articles-content',
			label: 'Articles Info',
			children: <ArticlesContent openNotification={openNotification as INotificationAction['openNotification']}/>,
		}
	]

	useEffect(() => {
		const { tab } = queryString.parse(window.location.search)
		const currentTab = tab ? `${tab}` : 'user-content'
		setTabQuery(currentTab)
		if(username){
			navigate(`/userinfo/${username}?${queryString.stringify({ tab: currentTab})}`)
		}
	}, [userInfo?.username]) 

	const onChange = (key: string) => {
		setTabQuery(key)
		navigate(`/userinfo/${username}?${queryString.stringify({ tab: key})}`)
	}

	return ( 
		<div className="user-info">
			<Tabs 
				className={'user-info__tabs'}
				defaultActiveKey="user-content"
				items={tabs}
				activeKey={tabQuery}
				onChange={onChange}
			/>
		</div>
	)
}

export default UserInfo
