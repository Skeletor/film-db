
import React from "react";
import { Spin } from 'antd'

import './loader.css'

const Loader = () => {
    return (
        <div className='loader'>
            <Spin />
        </div>
    )
}

export default Loader