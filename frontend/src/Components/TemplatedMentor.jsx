import React from 'react'
import "./css/TemplatedMentor.css";
import SidebarMentor from './SidebarMentor';

function TemplatedMentor({children,label}) {
  return (
    <div className='TemplatedMentor'>
    <div className='Sidebar'>
        <SidebarMentor label = {label} />
    </div>
    <div className='ground'>
        {children}
    </div>
</div>
  )
}

export default TemplatedMentor