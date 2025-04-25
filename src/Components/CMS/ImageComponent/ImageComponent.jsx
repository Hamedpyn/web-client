
const ImageComponent = ({item}) => {

    return (
        <img
            className="max-w-[100px] object-contain w-[100px] rounded h-[50px]"
            src={!item.cover.startsWith('http') ? `/images/${item.cover.slice(0, -3)}webp` : item.cover}
            alt={`Cover image: ${item.cover}`}
        />
    );
};

export default ImageComponent;