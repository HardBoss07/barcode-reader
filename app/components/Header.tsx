interface HeaderProps {
    currentPage: number;
}

export default function Header({currentPage}: HeaderProps) {
    const headerItems = ["Home", "Generate", "Read"];

    return (
        <header className="bg-[#F207A8] p-7 pb-1.5 shadow-md">
            <h1 className="text-4xl font-bold text-[#FFEDFB]">Barcode Generator & Reader</h1>
            <nav>
                <ul className="list-none p-0 my-4 flex gap-6">
                    {headerItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={`${index === 0 ? "/" : item.toLowerCase()}`}
                                className={`text-lg font-bold no-underline transition-colors duration-300 ease-in-out ${
                                    currentPage === index ? "text-[#242424]" : "text-[#FFEDFB] hover:text-[#242424]"
                                }`}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}