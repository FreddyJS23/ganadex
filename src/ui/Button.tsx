import React from 'react'
type ButtonProps={
    content:string
}

export const Button = ({content}:ButtonProps) => {
  return <div className="btn btn-primary btn-sm">{content}</div>;
}
