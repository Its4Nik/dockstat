# 🐳 Dockstat

Dockstat is a monitoring frontend powered by the [DockStatAPI](https://github.com/Its4Nik/dockstatapi).

It shows usage statistics like CPU, RAM and Network usage.

## 🖊️ WORK IN PROGRESS

- [X] Refactoring
- [X] Fix theme switcher
- [ ] WebUI for adding/removing hosts from the config of DockStatAPI
- [ ] Sorting for Hosts
- [ ] Custom host Tags like "Raspberry" or "Cloudserver"
- [ ] Alert System using apprise or similar
- [ ] better mobile UI
- [ ] Host Stats (CPU Cores, Max RAM amount available and ram used by containers)
- [X] More themes
- [ ] More advanced sub pages.
- [ ] Exlude network mode "host" from network stats or do smth else with it (not sure yet)

## ⬇️ Installation using Docker:

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
      - API_URL="http://localhost:7070" # Host of the DockStatAPI endpoint
      - DEFAULT_THEME="dracula"
      - SECRET="CHANGME"
    volumes:
      - ./dockstat/icons:/app/build/icons
    restart: always

    # API:
  dockstatapi:
    image: ghcr.io/its4nik/dockstatapi:latest
    container_name: dockstatapi
    environment:
      - SECRET=CHANGEME # This is required in the header 'Authorization': 'CHANGEME'
    ports:
      - "7070:7070"
    volumes:
      - ./dockstatapi:/api/config # Place your hosts.yaml file here
    restart: always
```

Environment Variables:
```yaml
API_URL="http://localhost:7070" # => The url of the API endpoint
DEFAULT_THEME="dracula" # => You can specify the default theme to use here. (dafaults to "dracula")
SECRET="CHANGEME" # => Please set the same key as specified in the dockstatapi
```

ℹ️ Please use HTTPS to fetch data from the API

---

### ❗❗❗ THIS CONFIGURATION IS FOR THE API ❗❗❗

Please place this file inside the mounted directory for `/api/config`.

Example for the host.yaml file:
```yaml
mintimeout: 10000 # The minimum time to wait before querying the same server again, defaults to 5000 Ms

log:
  logsize: 10 # Specify the Size of the log files in MB, default is 1MB
  LogCount: 1 # How many log files should be kept in rotation. Default is 5

hosts:
  YourHost1:
    url: server.local
    port: 2375

  YourHost2:
    url: raspberrypi.local
    port: 1234

  YourHost3:
    url: dockerhost.local
    port: 4321


container:
  MyContainer: # Container name
    link: https://github.com
    icon: container.png
```

---

## 🔗 Add quick links to containers

To add quick links to your containers, marked by the chain icon on the left site of the container, you need to specify them like this inside the yaml* file:

*) The yaml file of the DockStatAPI

```yaml
container:
  MyContainer:
    link: https://github.com
```

Inside the container section you can specify the link of said container by referencing the container's name.

---

## 🖼️ Add logos to containers

To add a logo to a container you can reference the logo file like this inside the yaml* file:

*) The yaml file of the DockStatAPI

```yaml
container:
  MyContainer:
    icon: mylogo.png
```

Be sure to mount the path `/app/build/icons` from the docker container and to populate it with your own icons.

📰 Example:

> I have a Logo.png file inside the `/app/build/icons` (mounted as `./icons` on the host)

> This is what my config, of the dockstat api should look like:

```yaml
container:
  MyContainer:
    icon: Logo.png
```

> Now the container with the name "MyContainer" will have this logo displayed.

---

## 🚫 Known Issues
### Open:

2. Adding the default theme will make other themes unusable due to not being able to select them.

---
### Resolved:

1. Theme switching only works once to the selected theme, you cant change back (yet). See the code logic here:

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

---

Please don't judge this project, it's my first time using react in a bigger project.

For more information open a new issue :D
