import AuthForm from './components/AuthForm'
import './style.scss'

const AuthPage = () => {
  return (
    <main className='auth-page'>
      <div className='bg-image'>
        <AuthForm />
      </div>
    </main>
  )
}

export default AuthPage