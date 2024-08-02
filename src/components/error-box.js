
import React from "react";
import { Alert } from 'antd';

const ErrorBox = (props) => {
    const { message: description } = props

    return (
        <Alert type='error'
               showIcon
               message={'Произошла ошибка при получении данных о фильмах'}
               description={description} />
    )
}

export default ErrorBox