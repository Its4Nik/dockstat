# 🖊️ Configuration

⚠️ = Required  
⚙️ = Optional

## Required
- **API_URL**: The URL of the DockStatAPI endpoint
- **SECRET**: The Secret Token for the DockStatAPI endpoint

## Optional
- **DEFAULT_THEME**: Default theme. Screenshots [here](/docs/MultipleThemes.md)
- **LOGO_SIZE**: Logo sizes (XS, S, M, L, XL)
- **DM_LOGO_COLOR**: Dark mode logo color (HEX)
- **LM_LOGO_COLOR**: Light mode logo color (HEX)

To use the original logo colors, enter "original" for both `LM_LOGO_COLOR` and `DM_LOGO_COLOR`.

ℹ️ Please use HTTPS to fetch data from the API.

---

## ❗ API Configuration

Place this file inside the mounted directory for `/api/config`.

### Example `hosts.yaml` File

```yaml
mintimeout: 10000 # Minimum time to wait before querying the same server again (default: 5000 ms)

log:
  logsize: 10 # Size of the log files in MB (default: 1MB)
  LogCount: 1 # Number of log files to keep in rotation (default: 5)

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
  MyContainer:
    link: https://github.com
    icon: container.png
```

---

## 🔗 Quick Links to Containers

Add quick links to your containers by specifying them in the `yaml` file:

```yaml
container:
  MyContainer:
    link: https://github.com
```

---

## 🖼️ Add Logos to Containers

### Simple Icons

Prefix the icon name with "SI:" to fetch the Simple Icon from their CDN.

Example:

```yaml
container:
  redis:
    icon: SI:redis
```

![Redis Example icon](/docs/screenshots/redis.png)

### Custom Logos

Reference a custom logo file:

```yaml
container:
  MyContainer:
    icon: mylogo.png
```

Ensure to mount `/app/build/icons` and populate it with your own icons.

Example:

```yaml
container:
  MyContainer:
    icon: Logo.png
```

---

## ✨ Tag Different Containers

![Tag example](/docs/screenshots/examples/16.png)

Add tags to containers in the configuration file:

```yaml
container:
  MyContainer:
    tags: private:violet-400
```

You can add multiple tags:

```yaml
container:
  MyContainer:
    tags: private:violet-400,cloudserver:red-200
```

Use TailwindCSS background color values. See [TailwindCSS colors](https://tailwindcss.com/docs/border-color) for reference.