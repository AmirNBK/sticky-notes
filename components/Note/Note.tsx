
const Note = (props: {
    content: string;
    bgColor: string;
    rotation: number;
}) => {
    return (
        <textarea placeholder="write a note..." defaultValue={props.content} cols={35} rows={15}
            style={{
                background: `${props.bgColor}`, outline: 'none', border: 'none', padding: '10px 20px', cursor: 'grab',
                transform: `rotate(${props.rotation}deg)`
            }}
        />
    );
};

export default Note;