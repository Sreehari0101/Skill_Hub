import React from 'react'
import "./css/TemplatedRecruiter.css";
import SidebarRecruiter from './SidebarRecruiter';

function TemplatedRecruiter({children,label}) {
  return (
    <div className='TemplatedRecruiter'>
        <div className='Sidebar'>
            <SidebarRecruiter label = {label} />
        </div>
        <div className='ground'>
            {children}
        </div>
</div>
  )
}

export default TemplatedRecruiter