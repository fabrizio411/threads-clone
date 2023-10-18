import './display.scss'

const RepostsDisplay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='display-section'>{children}</div>
  )
}

export default RepostsDisplay