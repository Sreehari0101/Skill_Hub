import React from 'react'
import Sidebar from './Sidebar'
import "./css/TemplatedStudent.css";

function TemplatedStudent({children,label}) {
  return (
    <div className='TemplatedStudent'>
        <div className='Sidebar'>
            <Sidebar label = {label} />
        </div>
        <div className='ground'>
            {children}
        </div>
</div>
  )
}

export default TemplatedStudent