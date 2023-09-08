import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface NoteProps {
    updateNotePosition: (id: number, position: { x: number; y: number }) => void;
    id: number;
    content: string;
    bgColor: string;
    rotation: number;
    onChange: (id: number, content: string) => void;
}

const Note: React.FC<NoteProps> = ({
    updateNotePosition,
    id,
    content,
    bgColor,
    rotation,
    onChange,
}) => {
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
    const [focused, setFocused] = useState<boolean>(false);

    useEffect(() => {
        const handleWindowMouseMove = (event: { clientX: number; clientY: number }) => {
            setMouseCoords({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, []);

    const initialPosition = JSON.parse(localStorage.getItem(`note_${id}`) || '{"x": 0, "y": 0}');
    const [{ x, y }, api] = useSpring(() => ({ x: initialPosition.x, y: initialPosition.y }));
    const bind = useDrag(({ offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: false }), {});

    useEffect(() => {
        updateNotePosition(id, { x: x.get(), y: y.get() });
        localStorage.setItem(`note_${id}`, JSON.stringify({ x: x.get(), y: y.get() }));
    }, [x.get(), y.get(), mouseCoords]);

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
                value={content}
                onChange={(e) => {
                    onChange(id, e.target.value);
                }}
                cols={35}
                rows={15}
                style={{
                    boxShadow: '0px 5px 6px 0px rgba(0, 0, 0, 0.75)',
                    background: bgColor,
                    outline: 'none',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'grab',
                    transition: 'all 0.5s',
                    transform: `${focused ? 'rotate(0deg) ' : `rotate(${rotation}deg)`} scale(${focused ? '1.1' : '1'})`,
                    position: 'absolute',
                }}
            />
        </animated.div>
    );
};

export default Note;
