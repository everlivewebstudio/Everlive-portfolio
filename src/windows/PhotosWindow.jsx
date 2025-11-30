import React from 'react';
import WindowFrame from '@/components/WindowFrame';
import { photos } from '@/constants/photos';

const PhotosWindow = () => {
    return (
        <WindowFrame id="photos" title="Photos" icon="/src/assets/images/icon-photos.png">
            <div className="h-full bg-white text-black flex flex-col">
                {/* Toolbar */}
                <div className="h-12 border-b border-gray-200 flex items-center justify-center font-medium text-gray-600">
                    Library
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-auto p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {photos.map((photo) => (
                            <div key={photo.id} className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WindowFrame>
    );
};

export default PhotosWindow;
