<h1 align="center">🐳 Dockstat 🐳</h1>
<img align="right" src="https://github.com/user-attachments/assets/9e8728ee-95a7-4946-91af-fbd535c3f86d" width="400" alt="DockStat Mockup" />
<p align="left">
  Dockstat is a monitoring frontend powered <br>
  by the [DockStatAPI](https://github.com/Its4Nik/dockstatapi). <br>
  It provides usage statistics like CPU, RAM, and Network usage.<br>
  See more examples [here](/docs/MultipleThemes.md).<br>
  Check the documentation (WIP) [here](https://outline.itsnik.de/s/dockstat).<br>
</p>
<br>

<img align="right" src="https://github.com/user-attachments/assets/4ffc8cc0-9a7b-4a09-837a-b0ba65a1c806" height="50%" alt="DockStat Mockup" />
<img align="left" src="https://github.com/user-attachments/assets/723b2186-b8b4-4eea-aa3e-3f68db023338" height="50%" alt="DockStat Mockup" />

<br>
<br>
<br>
<br>
<br>

## 🖊️ Work in Progress

- [X] Refactoring
- [X] Fix theme switcher
- [X] WebUI for API config (Read only)
- [ ] WebUI for adding/removing hosts from DockStatAPI config
- [X] Sorting for Hosts
- [X] Custom host tags (e.g., "Raspberry", "Cloudserver")
- [X] Alert System (using Apprise or similar)
- [X] Improved mobile UI
- [X] Host Stats (CPU cores, Max RAM, RAM used by containers)
- [X] More themes
- [X] More advanced sub-pages
- [X] Exclude network mode "host" from network stats or other handling
- [ ] Add "Secondary API Host" for high availability
- [ ] Persistent theme/refresh rate choice
- [X] Changable size of "Container Cards"

---

## ⬇️ Installation Using Docker

```yaml
name: DockStat
services:
  # Frontend
  dockstat:
    image: ghcr.io/its4nik/dockstat:latest
    container_name: dockstat
    ports:
      - "4444:3000"
    environment:
      - API_URL="http://localhost:7070" # DockStatAPI endpoint
      - DEFAULT_THEME="dracula"
      - SECRET="CHANGME"
      - LOGO_SIZE="M" # Default Logo Size "M"
      - DM_LOGO_COLOR="#FFFFFF" # Dark mode logo color
      - LM_LOGO_COLOR="#000000" # Light mode logo color
    volumes:
      - ./dockstat/icons:/app/build/icons
    restart: always

  # API
  dockstatapi:
    image: ghcr.io/its4nik/dockstatapi:latest
    container_name: dockstatapi
    environment:
      - SECRET=CHANGEME # Required in the header 'Authorization': 'CHANGEME'
    ports:
      - "7070:7070"
    volumes:
      - ./dockstatapi:/api/config # Place your hosts.yaml file here
    restart: always
```

## Configuration:

Please see [Configuration.md](/docs/Configuration.md)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=its4nik/dockstat,its4nik/dockstatapi&type=Date)](https://star-history.com/#its4nik/dockstat&its4nik/dockstatapi&Date)

---

## 🚫 Known Issues

### Open

3. [#24](https://github.com/Its4Nik/dockstat/issues/24)

### Resolved

1. Theme switching only works once. See [code logic](/docs/known-issues.md#-----1-theme-switching-bug) for details.

2. Adding the default theme will make other themes unusable due to not being able to select them. See [code logic](/docs/known-issues.md#-----2-theme-unavailability-issue) for details.
---

Please don't judge this project too harshly—it's my first major React project. For more information, open a new issue! 😄
