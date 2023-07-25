import React from "react";
import { Link, Outlet } from "react-router-dom";
import { HomeIcon, CartIcon } from "./icons";
import Search from "./search";

const Layout = ({ categories }) => {
    const renderCategories = () => {
        return categories.data.map(c => 
          <li key={c.id}>
            <Link to={`/categories/${c.id}`}>{c.title}</Link>
          </li>
          );
      };

    return (
        <>
        <header>
          <div id="headerHomeIcon">
         <Link to='/'> <HomeIcon width={40} /></Link> 
          </div>

          <Search /> 
          <div id="headerTitle">Our Store</div>
          <div id="headerCartIcon">
            <Link to='/basket'><CartIcon width={40} /></Link>
          </div>
        </header>
        <section>
          <nav>
            {categories.errorMessage && (
            <div>Error: {categories.errorMessage}</div>
            )}
        
          <ul>{categories.data && renderCategories()}</ul>
          </nav>
          <main>
            <Outlet />
          </main>
        </section>
        
        <footer><Link to="/">Home</Link> | <Link to="/basket">Basket</Link></footer>  
            </>
    )
}

export default Layout;