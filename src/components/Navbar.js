import {NavbarItems} from './NavbarItems';

function Navbar() {
    return (
        <nav className="navbar">
            <img src="/images/sandbox.svg" />
            <ul>
                {NavbarItems.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};

export default Navbar;