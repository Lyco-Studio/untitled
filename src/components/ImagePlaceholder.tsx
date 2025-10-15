import React from 'react';
import { FaImage } from 'react-icons/fa';

interface ImagePlaceholderProps {
    /** 占位区域的高度，支持CSS长度单位 */
    height?: string;
    /** 占位文字 */
    placeholderText?: string;
}

/**
 * 图片占位区域组件，用于预留图片位置
 */
const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
                                                               height = 'clamp(200px, 40vh, 400px)',
                                                               placeholderText = '图片将放置于此'
                                                           }) => {
    return (
        <div className="image-placeholder" style={{ height }}>
            <div className="placeholder-content">
                <FaImage size={64} className="placeholder-icon" />
                <p className="placeholder-text">{placeholderText}</p>
            </div>
        </div>
    );
};

export default ImagePlaceholder;
