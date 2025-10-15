import React, { useEffect, useRef } from 'react';

interface ArgonCardProps {
    /** 卡片内容 */
    children: React.ReactNode;
    /** 卡片唯一标识，用于动画 */
    id: string;
}

/**
 * Argon风格卡片组件，带有阴影和圆角
 */
const ArgonCard: React.FC<ArgonCardProps> = ({ children, id }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && cardRef.current) {
                        cardRef.current.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div ref={cardRef} id={id} className="argon-card">
            <div className="card-content">{children}</div>
        </div>
    );
};

export default ArgonCard;
