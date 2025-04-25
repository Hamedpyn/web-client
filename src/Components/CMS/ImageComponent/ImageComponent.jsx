
const ImageComponent = (props) => {

    return (
        <img
            className="max-w-[100px] object-contain w-[100px] rounded h-[50px]"
            src={!props.cover.startsWith('http') ? `/images/${props.cover.slice(0, -3)}webp` : props.cover}
            alt={`Cover image: ${props.cover}`}
        />
    );
};

export default ImageComponent;