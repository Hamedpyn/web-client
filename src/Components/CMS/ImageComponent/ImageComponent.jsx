
const ImageComponent = ({ item }) => {

    return (
        <img
            className="max-w-[100px] object-contain w-[100px] rounded h-[50px]"
            src={item.cover}
            alt={item?.cover ? `Cover image: ${item.cover}` : 'No image available'}
        />
    );
};

export default ImageComponent;