import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { input, type = 'text', value, className = '', isFocused = false, onErrors, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
        reset: () => {
            if(localRef.current){
                localRef.current.value = '';
            }
        },
    }))

    useEffect(() => {
        if (isFocused) {
            // input.current.focus();
        }
    }, [isFocused]);

    return (
        <div className="mt-2">
            <input
                {...props}
                type={type}
                className={
                    'block w-full rounded-md border border-input bg-background p-2 text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6' +
                    className
                }
                value={value}
                ref={localRef}
            />
            {onErrors}
        </div>
    );
});