import React from 'react'
import "./css/TemplatedStudent.css";
import SidebarStudent from './SidebarStudent';

function TemplatedStudent({children,label}) {
  return (
    <div className='TemplatedStudent'>
        <div className='Sidebar'>
            <SidebarStudent label = {label} />
        </div>
        <div className='ground'>
            {children}
        </div>
</div>
  )
}

export default TemplatedStudent