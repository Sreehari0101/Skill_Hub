import React from 'react'
import "./css/Titlecard.css";

function TitleCard({titleName}) {
  return (
    <div className="title-card">
        <h1>{titleName}</h1>

    </div>
  )
}

export default TitleCard