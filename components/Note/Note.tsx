import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

const Note = (props: {
    updateNotePosition: (id: number, position: { x: number; y: number }) => void;
    id: number;
    content: string;
    bgColor: string;
    rotation: number;
    onChange: (id: number, content: string) => void;
}) => {
    const [focused, setFocused] = useState<boolean>(false);

    const initialPosition = JSON.parse(localStorage.getItem(`note_${props.id}`) || '{"x": 0, "y": 0}');
    const [{ x, y }, api] = useSpring(() => ({ x: initialPosition.x, y: initialPosition.y }));

    const bind = useDrag(({ offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: false }), {});

    useEffect(() => {
        props.updateNotePosition(props.id, { x: x.get(), y: y.get() });
        localStorage.setItem(`note_${props.id}`, JSON.stringify({ x: x.get(), y: y.get() }));
    }, [x.get(), y]);

    const handleNoteClick = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <animated.div {...bind()} style={{ x, y, touchAction: 'none' }}>
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
                    transform: `${focused ? 'rotate(0deg) ' : `rotate(${props.rotation}deg)`} scale(${focused ? '1.1' : '1'
                        })`,
                    position: 'absolute',
                }}
            />
        </animated.div>
    );
};

export default Note;
