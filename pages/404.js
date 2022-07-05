import styles from "../styles/Home.module.css"
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
    return ( 
        <div className={styles.notfound}>
            <h1>Opsss...</h1>
            <h2>The page cannot be found.</h2>
        </div>
     );
}
 
export default NotFound;