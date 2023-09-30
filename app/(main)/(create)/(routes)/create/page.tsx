import { getUser } from '@/libs/actions/user.actions'

import LockIcon from '@/components/icons/LockIcon'
import CreateForm from '../../components/CreateForm'
import './style.scss'

const CreatePage = async () => {
  const user = await getUser()

  return (
    <section className='page create-page'>
      <div className='container'>
        
        {user.isPrivate && (
          <div className='private-msg'>
            <LockIcon />
            <p className='msg'>Only your followers can see your replies because your profile is private</p>
          </div>
        )}

        <CreateForm userId={user._id.toString()} username={user.username} image={user.image} isPrivate={user.isPrivate}/>
      </div>
    </section>
  )
}

export default CreatePage