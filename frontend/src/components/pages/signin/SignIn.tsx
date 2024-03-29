﻿import React from 'react'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import { Form, Input, Button, Typography, Checkbox } from 'antd'


import '@app/pages/signIn/signIn.scss'
import { useAppDispatch } from '@app/store/store'
import { signInAction } from '@app/store/slices/userInfo'

const { Title } = Typography

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 }
	}
}

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 4
		}
	}
}

const Signin: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [form] = Form.useForm()
	const openNotification = useOutletContext()
	const handleSubmitForm = () => {
		form.validateFields().then((values) => {
			const {...data} = values
			dispatch(signInAction({...data, openNotification, navigate }))
		})
	}

	const handleUsernameValidator = (rule: { required: boolean }, value: string) => {
		if(rule?.required && (!value || !value.trim())){
			return Promise.reject(new Error('Field must not be empty'))
		}
		if(value.length < 6){
			return Promise.reject(new Error('Username length must be longer than 6 characters'))
		}
		if(value.search(/^[a-zA-Z0-9]+$/)){
			return Promise.reject(new Error('Incorrect login. Use characters a-z, A-Z, 0-9'))
		}
		return Promise.resolve()
	}

	const handlePasswordValidator = (rule: { required: boolean }, value: string) => {
		if(rule?.required && (!value || !value.trim())){
			return Promise.reject(new Error('Field must not be empty'))
		}
		if(value.length < 6){
			return Promise.reject(new Error('Password length must be longer than 6 characters'))
		}
		if(value.search(/^[a-zA-Z0-9]+$/)){
			return Promise.reject(new Error('Incorrect password. Use characters a-z, A-Z, 0-9'))
		}
		return Promise.resolve()
	}

	return (
		<div className="signin">
			<Title className={'signin__text'}>Sign In</Title>
			<NavLink to={'/signup'} className={'signin__link-title'}>
				Need an account?
			</NavLink>
			<Form
				form={form}
				name="signin"
				{...formItemLayout}
				initialValues={{ remember: true }}
				onFinish={handleSubmitForm}
				autoComplete="off"
			>
				<Form.Item 
					hasFeedback
					label="Username" 
					name="username" 
					validateDebounce={1000}
					rules={[{ required: true, validator:handleUsernameValidator }]}
				>
					<Input placeholder="Input username" />
				</Form.Item>

				<Form.Item 
					hasFeedback
					label="Password" 
					name="pass" 
					validateDebounce={1000}
					rules={[{ required: true, validator: handlePasswordValidator }]}
				>
					<Input.Password placeholder="Input password" autoComplete='on'/>
				</Form.Item>

				<Form.Item 
					hasFeedback
					name="remember" 
					label="Remember me" 
					valuePropName="checked"
				>
					<Checkbox/>
				</Form.Item>

				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Signin
