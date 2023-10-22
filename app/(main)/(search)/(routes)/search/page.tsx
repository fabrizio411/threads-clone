import { getUser, searchUsers } from '@/libs/actions/user.actions'
import './style.scss'
import UserCard from '@/components/cards/user/UserCard'
import LoadingSpinner from '@/components/icons/spinner/LoadingSpinner'
import SearchForm from '../../components/SearchForm'

const SearchPage = async () => {
  const user = await getUser()
  if (!user) return null

  const result = await searchUsers({
    userId: user._id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25
  })

  return (
    <section className='page search-page'>

      <SearchForm />

      <div>
        {result ? (
          result.users.length === 0 ? (
            <p className='no-result'>No users found</p>
          ) : (
            result.users.map((item: any) => (
              <UserCard 
                key={user._id.toString()}
                currentUserId={user._id.toString()}
                userId={item._id.toString()}
                isPrivate={item.isPrivate}
                username={item.username}
                name={item.name}
                image={item.image}
                followersNum={item.followers.length}
                isFollowing={item.followers.includes(user._id)}
                isPending={item.followRequests.includes(user._id)}
                followCurrentUser={item.following.includes(user._id)}
              />
            ))
          )
        ) : (
          <div className='loading-box'>
            <LoadingSpinner height='30' width='30' />
          </div>
        )}
      </div>
      
    </section>
  )
}

export default SearchPage