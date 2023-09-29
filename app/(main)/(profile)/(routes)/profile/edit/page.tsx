import { getUser } from '@/libs/actions/user.actions'
import UpdateForm from '../../../components/edit-profile/UpdateForm'

import './style.scss'

const EditPage = async () => {
  const user = await getUser()

  return (
    <div className='page edit-profile-page'>
      <UpdateForm id={user._id.toString()} name={user.name} username={user.username} bio={user.bio} image={user.image} isPrivate={user.isPrivate} />
    </div>
  )
}

export default EditPage