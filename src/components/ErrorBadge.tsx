export const ErrorBadge = ({ error }: { error: string }) => {
    
    return (
        <div className="flex items-center justify-center p-2 border border-red-500 rounded-md bg-red-50">
            <p className="ml-2 text-red-500 text-xs">{error}</p>
        </div>
    );
};