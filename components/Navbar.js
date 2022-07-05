import Link from 'next/link'
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Image src="/done.png" width={128} height={77}></Image>
            </div>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/todolist">
                <a>To Do List</a>
            </Link>
            <Link href="/checklist">
                <a>Checklist</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
        </nav>
    );
}

export default Navbar;