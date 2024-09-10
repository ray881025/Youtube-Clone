'use client';

import SignIn from "./sign-in";
import Link from "next/link";
import Image from 'next/image'; 
import styles from "./navbar.module.css";
import Upload from "./upload";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { User } from "firebase/auth";


function NavBar() {
  // Initialize user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [] /* No dependencies, never rerun */);


  return (
    <nav className={styles.nav}>
      <Link href="/">
        <span className={styles.logoContainer}>
          <Image className={styles.logo} src="/youtube-logo.svg" alt="YouTube Logo" width={100} height={50} />  {/* 使用 Image 組件 */}
        </span>
      </Link>
      {user && <Upload />}
      <SignIn user={user} />
    </nav>
  );
}

export default NavBar;
