const StagingArea: React.FC<{ policeCount: number }> = ({ policeCount = 0 }) => {
    return (
        <div className="w-[160px] rounded-md border-cyan-500 border-dashed aspect-square border p-4 flex items-center relative">
            <div className="text-zinc-300 text-xl mb-2 font-saira_stencil uppercase absolute -rotate-45 left-1/2 top-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2 text-center leading-none">Staging Area</div>
            <div className="w-full flex flex-wrap gap-2 justify-center relative z-10">
                {new Array(policeCount).fill('i').map((_item, index) => (
                    <div key={index} className="w-4 h-4 bg-white shadow-md inline-block outline outline-2 outline-black" />
                ))}
            </div>
        </div>
    )
}

export default StagingArea;