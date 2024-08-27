import '../../assets/styles/Nav.css'

export default props =>
    <aside className="sidebar">
        <nav>
            <ul>
                <li>
                    <i className="fa-solid fa-book"></i>
                    <a href="#history">História </a>
                </li>
                <li>
                    <i className="fa-solid fa-user-group"></i>
                    <a href="#members">Membros</a>
                </li>
                <li>
                    <i className="fa-solid fa-images"></i>
                    <a href="#album">Álbum</a>
                </li>
            </ul>
        </nav>
    </aside>