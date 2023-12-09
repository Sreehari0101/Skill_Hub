import React from 'react'
import Sidebar from './Sidebar'
import "./css/TemplatedStudent.css";

function Templated({children,label}) {
  return (
    <div className='Templated'>
        <div className='Sidebar'>
            <Sidebar label = {label} />
        </div>
        <div className='ground'>
            {children}
        </div>
</div>
  )
}

export default Templated