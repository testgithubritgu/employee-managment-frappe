import { useSelector } from 'react-redux'
import type { RootState } from '../../../app-store/store'
import { memo } from 'react'

const Test = () => {
    const count = useSelector((state:RootState)=>state.counter.value)
  return (
    <div>
      this is updated count {count}
    </div>
  )
}

export default memo(Test)
