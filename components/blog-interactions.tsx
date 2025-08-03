'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface BlogInteractionsProps {
    blogId: string;
    blogTitle: string;
    blogUrl: string;
    className?: string;
}

export default function BlogInteractions({ blogId, blogTitle, blogUrl, className = '' }: BlogInteractionsProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Since Supabase is commented out, we'll just set loading to false
        setIsLoading(false);
    }, [blogId]);

    const loadLikeData = () => {
        // Mock function
    };

    const handleLike = () => {
        // Mock function
    };

    return (
        <div className={`flex items-center justify-start mt-4 pt-3 border-t border-stone-700 -mx-4 px-4 ${className}`}>
            {/* Like Button - Left aligned */}
            <button
                onClick={handleLike}
                disabled={isLoading}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${isLiked
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-white/5 text-stone-400 hover:bg-white/10 hover:text-red-400'
                    }`}
            >
                <Heart
                    className={`w-4 h-4 ${isLiked ? 'fill-current' : ''} ${isLoading ? 'animate-pulse' : ''}`}
                />
                <span>{isLoading ? '...' : likeCount}</span>
            </button>
        </div>
    );
} 