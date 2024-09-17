# Known Issues

## Description

This document lists known issues with the Dockstat project, along with their status and potential workarounds. The goal is to keep users informed about any current problems and provide updates as we work on resolving them.

## Current Issues

/

## Resolved Issues

<h3 align="center">
    ❌ 3. Tedious tagging system
</h3>

**Description:**
The current tagginng system relies on every container being tagged by itself, this is pretty annoying if i can say so.

**Status:**
✅ Resolved

**Workaround:**
No workaround is needed as the issue has been resolved in the latest update.

**Corresponding issue:**
[#13](https://github.com/Its4Nik/dockstat/issues/13)

---

<h3 align="center">
    ❌ 2. Theme Unavailability Issue
</h3>

**Description:**
Adding the default theme may render other themes unusable due to the inability to select them.

**Status:**
✅ Resolved

**Workaround:**
No workaround is needed as the issue has been resolved in the latest update.

**Corresponding issue:**
/

---

<h3 align="center">
    ✏️ 1. Theme Switching Bug
</h3>

**Description:**  
Theme switching only works once to the selected theme; users cannot switch back to a previously selected theme. This issue is due to the current logic in the theme loading mechanism.

**Status:**
✅ Resolved

**Workaround:**
No workaround is needed as the issue has been resolved in the latest update.

**Related Code:**
```javascript
// App.js - Line 42 -> 51
useEffect(() => {
    setLoadingTheme(true);
    if (theme === 'nord') {
        import('./themes/nord.css').then(() => setLoadingTheme(false));
    } else if (theme === 'dracula') {
        import('./themes/dracula.css').then(() => setLoadingTheme(false));
    } else if (theme === 'light') {
        import('./themes/light.css').then(() => setLoadingTheme(false));
    }
}, [theme]);
```

**Corresponding issue:**
/