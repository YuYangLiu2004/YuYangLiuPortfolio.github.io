import React from 'react';

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light shadow-sm">
                <div className="container">
                    <a className="navbar-brand fs-4" href="/"><i className="bi bi-airplane-engines-fill"></i> G36 Air</a>
                </div>
            </nav>
        </header>
    );
}

export default Header;