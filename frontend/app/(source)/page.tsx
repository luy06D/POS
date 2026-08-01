import {redirect} from 'next/navigation'

export default function HomePage() {

  redirect('/1')
  return (
    <>
    <div>HOME PAGE</div>
    </>
  )
}
