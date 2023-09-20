import './layout.scss'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='auth-page'>
      <div className='bg-image'>
        {children}
      </div>
    </main>
  )
}

export default AuthLayout