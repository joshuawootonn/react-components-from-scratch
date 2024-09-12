import clsx from 'clsx'

const items = new Array(30).fill(null).map((_, i) => i)

function Root() {
    return (
        <div>
            <div className="px-2 border-2 border-black">selectable area</div>
            <div className="relative z-0 border-2 border-black grid grid-cols-8 sm:grid-cols-10 gap-4 p-4 -translate-y-0.5">
                {items.map(item => (
                    <div
                        className={clsx(
                            'border-2 size-10 border-black flex justify-center items-center',
                        )}
                        key={item}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function Step0Demo() {
    return <Root />
}
