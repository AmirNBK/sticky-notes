import { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import './Note.css'

const Note = (props: {
    updateNotePosition: (id: number, position: { x: number; y: number }) => void;
    id: number;
    content: string;
    bgColor: string;
    rotation: number;
    onChange: (id: number, content: string) => void;
    mouseCoords: any
}) => {
    const [focused, setFocused] = useState<boolean>(false)

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

    const bind = useDrag(({ offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: false }), {
    })

    useEffect(() => {
        props.updateNotePosition(props.id, { x: x.animation.to, y: y.animation.to });
    }, [x.animation.to]);

    const handleNoteClick = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <animated.div {...bind()} style={{ x, y, touchAction: 'none' }} >
            <textarea
                onClick={handleNoteClick}
                onBlur={handleBlur}
                className='NoteCard'
                placeholder="write a note..."
                value={props.content}
                onChange={(e) => {
                    props.onChange(props.id, e.target.value);
                }}
                cols={35}
                rows={15}
                style={{
                    boxShadow: ' 0px 5px 6px 0px rgba(0,0,0,0.75)',
                    background: `${props.bgColor}`,
                    outline: 'none',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'grab',
                    transition: 'all 0.5s',
                    transform: `${focused ? 'rotate(0deg) ' : `rotate(${props.rotation}deg)`} scale(${focused ? '1.1' : '1'})`,
                    position: 'absolute',
                }}
            />
        </animated.div>
    );
};


export default Note;