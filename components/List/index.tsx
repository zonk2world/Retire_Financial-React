import { PropertySafetyFilled } from '@ant-design/icons';
import React from 'react';

interface ComponentProps {
    children: any;
    className?: string;
}

const List: React.FC<ComponentProps> = ({ className, children }) => {
    return (
        <div className={`flex items-start ${className}`}>
            <div className="mt-[13px] w-6">
                <div className="w-2 h-2 bg-[#FAA942] rounded-full"></div>
            </div>
            <div className="flex-1 text-lg leading-[30px] text-[#434A59]">
                {children}
            </div>
        </div>
    )
};

export default List;
