import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

const Note = (props: {
    id: number;
    content: string;
    bgColor: string;
    rotation: number;
    onChange: (id: number, content: string) => void;
}) => {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

    const bind = useDrag(({ offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: false }), {
    })
    return (
        <animated.div {...bind()} style={{ x, y, touchAction: 'none' }} >
            <textarea
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
                    transform: `rotate(${props.rotation}deg)`,
                    position: 'absolute',
                }}
            />
        </animated.div>
    );
};


export default Note;