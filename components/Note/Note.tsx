
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
const Note = (props: {
    content: string;
    bgColor: string;
    rotation: number;
}) => {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        api.start({ x: mx, y: my, immediate: true });
    });


    return (
        <animated.div {...bind()} style={{ x, y }}>
            <textarea placeholder="write a note..." defaultValue={props.content} cols={35} rows={15}
                style={{
                    background: `${props.bgColor}`, outline: 'none', border: 'none', padding: '10px 20px', cursor: 'grab',
                    transform: `rotate(${props.rotation}deg)` , position : 'absolute'
                }}
            />
        </animated.div>
    );
};

export default Note;