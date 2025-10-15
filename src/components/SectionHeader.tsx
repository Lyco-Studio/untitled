import React from 'react';
import type {IconType} from 'react-icons';

type Theme = 'primary' | 'secondary';

interface SectionHeaderProps {
    /** 区域标题 */
    title: string;
    /** 标题前的图标 */
    icon: IconType;
    /** 主题颜色 */
    theme: Theme;
}

/**
 * 区域标题组件，包含图标和标题
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon, theme }) => {
    return (
        <div className="section-header">
            <div className={`icon-container ${theme === 'primary' ? 'primary-bg' : 'secondary-bg'}`}>
                <Icon size={20} className={`section-icon ${theme}`} />
            </div>
            <h2 className="section-title">{title}</h2>
        </div>
    );
};

export default SectionHeader;
