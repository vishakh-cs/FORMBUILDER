import { SORT_OPTIONS } from "../../../utils/helper";


export default function ListFormsToolbar({
    formCount,
    search,
    sortBy,
    onSearchChange,
    onSortChange,
}) {
    console.log("form dounr", formCount)
    return (
        <div className="mb-6 flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">
                    My Forms
                </h3>

                <p className="text-sm text-slate-500">
                    {formCount} Form{formCount !== 1 ? "s" : ""}
                </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative">
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>

                    <input
                        type="text"
                        placeholder="Search forms..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-black focus:border-indigo-500 focus:outline-none md:w-72"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600">
                        Sort By
                    </span>

                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-black focus:border-indigo-500 focus:outline-none"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
