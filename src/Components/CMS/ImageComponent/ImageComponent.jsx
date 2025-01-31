import { useState } from "react";

const ImageComponent = ({ item }) => {
    const [imageSrc, setImageSrc] = useState(`/images/${item.cover.slice(0,-3)}webp`);

    const handleImageError = () => {
        setImageSrc('/images/NoImg.jpg');
    };

    return (
        <img
            className="max-w-[100px] object-contain w-[100px] rounded h-[50px]"
            src={imageSrc}
            onError={handleImageError}
            alt={item?.cover ? `Cover image: ${item.cover}` : 'No image available'}
        />
    );
};

export default ImageComponent;