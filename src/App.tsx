import './App.css'
import Note from '../components/Note/Note'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

function App() {

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
  })

  return (
    <div>
      <animated.div {...bind()} style={{ x, y }}>
        <Note content='content of note 1' bgColor='#2fb4ab' rotation={4} />
      </animated.div>
    </div>
  )
}

export default App
