import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPrompt from "@/pages/modals/AdminPrompt";
import ProductListings from "./Products";
import "@/pages/styles/Header.css";


const Header=()=>{
    const [admin,setAdmin]=useState(true)
    const [searchQuery, setSearchQuery]=useState("")
    const [open,setOpen]=useState(false)
    const [showPrompt,setShowPrompt]=useState(false)
    const [password,setPassword]=useState("")
    const navigate=useNavigate();

    const handleSearch=(e)=>{
        e.preventDefault();
        console.log("searching for",searchQuery);
    }

    const handleAdmin=()=>{
    if (!admin){
            setShowPrompt(true)
        }else{
            setAdmin(false)
        }
    };

    const verifyPassword = () => {
    if (password === "admin123") { 
      setAdmin(true);
      setShowPrompt(false);
      setPassword(""); 
    } else {
      alert("Incorrect password");
      setPassword("");
    }
  };

    const handleAction=(action)=>{
        console.log("action clicked",action);
        if(admin){
        if(action==="add"){
            navigate('/add-product');
        }else{
            navigate("/home");
        }
        }
        else{
            setShowPrompt(true);
        }
    }

    return(
        <header className="header">
            <div className="header-top">
            <div className="header-container">
                <div className="logo">
                    <h1>Prodify</h1>
                </div>
                <div className="search-bar">
                    <form onSubmit={(e)=>e.preventDefault()} className="search-form">
                        <input type="text" placeholder="Search categories..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} 
                        className="search-input"/> 
                    </form>
                </div>
                <div className="admin-toggle">
                    <label className="toggle-label">
                        <span className="toggle-text">Admin</span>
                        <button type="button" className={`toggle-switch ${admin?'active':''}`} onClick={handleAdmin}>
                            <div className="toggle-slider"></div>
                        </button>
                    </label>
                </div>

                <div>
                    <h2 className="products-text" onClick={()=>navigate('/home')}>Products</h2>
                </div>

                <div className="actions-container">
                    <button onClick={()=>setOpen(!open)} className="actions-button">Actions</button>
                    {open && (
                        <div className="actions-dropdown">
                            <div className="dropdown-list">
                                <button onClick={()=>handleAction("add")} className="dropdown-item">Add Product</button>
                                <button onClick={()=>handleAction("edit")} className="dropdown-item">Edit Product</button>
                                <button onClick={()=>handleAction("delete")} className="dropdown-item">Delete Product</button>
                            </div>
                        </div>
                    )}
                </div>
               
            </div>
        </div>
              {showPrompt && (
        <AdminPrompt
          password={password}
          setPassword={setPassword}
          onSubmit={verifyPassword}
          onCancel={() => setShowPrompt(false)}
        />
      )}
       <div className="header-content">
    <ProductListings admin={admin} searchQuery={searchQuery}/>
  </div>
        </header>
    )
}

export default Header;