/* ═══════════════════════════════════════════════════════════════════
   hooks/useOutsideClick.js
   ---------------------------------------------------------------------
   WHY THIS FILE EXISTS
   The Navbar had a useEffect that closed the notifications dropdown
   AND the profile dropdown whenever you clicked outside either one.
   That "listen for mousedown, check if click was outside a ref, close
   it" pattern is generic — any dropdown/modal/menu anywhere in the app
   (admin, lecturer, courses filters, etc.) will want the same thing.
   So it's extracted into a single reusable hook instead of being
   copy-pasted per component.

═══════════════════════════════════════════════════════════════════ */
"use client";
import { useEffect } from "react";

export function useOutsideClick(ref, onOutsideClick) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onOutsideClick]);
}
