import React from 'react'

interface ErrorsProps {
  errors: string[]
}

export const Errors: React.FC<ErrorsProps> = ({ errors }) => {
  if(errors.length === 0) {
     return <></>
  } else {
    return <div>
      Errors Occured:<br/>
      { errors.map((error, key) => {
        return <div key={key}>{error}</div>
      })}
    </div>
  }
}