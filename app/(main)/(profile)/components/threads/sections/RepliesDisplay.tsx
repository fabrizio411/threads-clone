import './display.scss'

const RepliesDisplay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='display-section'>{children}</div>
  )
}

export default RepliesDisplay